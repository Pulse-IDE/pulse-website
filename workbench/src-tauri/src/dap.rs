use parking_lot::Mutex;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::{AppHandle, Emitter};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DapLaunchPayload {
    pub adapter_command: Vec<String>,
    pub program: String,
    pub cwd: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DapDispatchPayload {
    pub session_id: String,
    pub command: String,
    pub arguments: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DapEvent {
    pub session_id: String,
    pub command: String,
    pub body: serde_json::Value,
}

struct DapSession {
    program: String,
    cwd: String,
}

pub struct DapHub {
    sessions: Mutex<HashMap<String, DapSession>>,
}

impl DapHub {
    pub fn new() -> Self {
        Self {
            sessions: Mutex::new(HashMap::new()),
        }
    }

    pub fn launch(&self, payload: DapLaunchPayload) -> Result<String, String> {
        if payload.adapter_command.is_empty() {
            return Err("adapter command required".to_string());
        }
        let session_id = uuid::Uuid::new_v4().to_string();
        self.sessions.lock().insert(
            session_id.clone(),
            DapSession {
                program: payload.program,
                cwd: payload.cwd,
            },
        );
        Ok(session_id)
    }

    pub fn dispatch(&self, app: AppHandle, payload: DapDispatchPayload) -> Result<(), String> {
        let sessions = self.sessions.lock();
        let session = sessions
            .get(&payload.session_id)
            .ok_or_else(|| "dap session not found".to_string())?;
        let mut body = payload.arguments;
        if let Some(map) = body.as_object_mut() {
            map.insert(
                "program".to_string(),
                serde_json::Value::String(session.program.clone()),
            );
            map.insert(
                "cwd".to_string(),
                serde_json::Value::String(session.cwd.clone()),
            );
        }
        let event = DapEvent {
            session_id: payload.session_id,
            command: payload.command,
            body,
        };
        drop(sessions);
        app.emit("dap://event", event).map_err(|e| e.to_string())
    }

    pub fn terminate(&self, session_id: &str) -> Result<(), String> {
        self.sessions.lock().remove(session_id);
        Ok(())
    }
}
