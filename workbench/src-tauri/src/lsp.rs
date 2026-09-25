use parking_lot::Mutex;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::{AppHandle, Emitter};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LspInitializePayload {
    pub language_id: String,
    pub root_uri: String,
    pub server_command: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LspDispatchPayload {
    pub session_id: String,
    pub method: String,
    pub params: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LspEvent {
    pub session_id: String,
    pub method: String,
    pub params: serde_json::Value,
}

struct LspSession {
    language_id: String,
    root_uri: String,
}

pub struct LspHub {
    sessions: Mutex<HashMap<String, LspSession>>,
}

impl LspHub {
    pub fn new() -> Self {
        Self {
            sessions: Mutex::new(HashMap::new()),
        }
    }

    pub fn initialize(&self, payload: LspInitializePayload) -> Result<String, String> {
        if payload.server_command.is_empty() {
            return Err("server command required".to_string());
        }
        let session_id = uuid::Uuid::new_v4().to_string();
        self.sessions.lock().insert(
            session_id.clone(),
            LspSession {
                language_id: payload.language_id,
                root_uri: payload.root_uri,
            },
        );
        Ok(session_id)
    }

    pub fn dispatch(&self, app: AppHandle, payload: LspDispatchPayload) -> Result<(), String> {
        let sessions = self.sessions.lock();
        let session = sessions
            .get(&payload.session_id)
            .ok_or_else(|| "lsp session not found".to_string())?;
        let mut params = payload.params;
        if let Some(map) = params.as_object_mut() {
            map.insert(
                "languageId".to_string(),
                serde_json::Value::String(session.language_id.clone()),
            );
            map.insert(
                "rootUri".to_string(),
                serde_json::Value::String(session.root_uri.clone()),
            );
        }
        let event = LspEvent {
            session_id: payload.session_id,
            method: payload.method,
            params,
        };
        drop(sessions);
        app.emit("lsp://event", event).map_err(|e| e.to_string())
    }

    pub fn shutdown(&self, session_id: &str) -> Result<(), String> {
        self.sessions.lock().remove(session_id);
        Ok(())
    }
}
