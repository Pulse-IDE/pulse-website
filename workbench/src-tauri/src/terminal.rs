use parking_lot::Mutex;
use portable_pty::{native_pty_system, CommandBuilder, MasterPty, PtySize};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::io::{Read, Write};
use std::sync::Arc;
use tauri::{AppHandle, Emitter};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TerminalCreatePayload {
    pub cwd: Option<String>,
    pub cols: u16,
    pub rows: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TerminalWritePayload {
    pub session_id: String,
    pub data: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TerminalResizePayload {
    pub session_id: String,
    pub cols: u16,
    pub rows: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TerminalOutputEvent {
    pub session_id: String,
    pub data: String,
}

struct TerminalSession {
    writer: Box<dyn Write + Send>,
    master: Mutex<Box<dyn MasterPty + Send>>,
}

pub struct TerminalManager {
    sessions: Mutex<HashMap<String, TerminalSession>>,
}

impl TerminalManager {
    pub fn new() -> Self {
        Self {
            sessions: Mutex::new(HashMap::new()),
        }
    }

    pub fn create(
        &self,
        app: AppHandle,
        payload: TerminalCreatePayload,
    ) -> Result<String, String> {
        let pty_system = native_pty_system();
        let pair = pty_system
            .openpty(PtySize {
                rows: payload.rows,
                cols: payload.cols,
                pixel_width: 0,
                pixel_height: 0,
            })
            .map_err(|e| e.to_string())?;
        let shell = if cfg!(windows) {
            std::env::var("COMSPEC").unwrap_or_else(|_| "cmd.exe".to_string())
        } else {
            std::env::var("SHELL").unwrap_or_else(|_| "/bin/sh".to_string())
        };
        let mut cmd = CommandBuilder::new(shell);
        if let Some(cwd) = payload.cwd {
            cmd.cwd(cwd);
        }
        let _child = pair
            .slave
            .spawn_command(cmd)
            .map_err(|e| e.to_string())?;
        let master = pair.master;
        let mut reader = master.try_clone_reader().map_err(|e| e.to_string())?;
        let writer = master.take_writer().map_err(|e| e.to_string())?;
        let session_id = Uuid::new_v4().to_string();
        self.sessions.lock().insert(
            session_id.clone(),
            TerminalSession {
                writer,
                master: Mutex::new(master),
            },
        );
        let sid = session_id.clone();
        std::thread::spawn(move || {
            let mut buf = [0u8; 8192];
            loop {
                match reader.read(&mut buf) {
                    Ok(0) => break,
                    Ok(n) => {
                        let data = String::from_utf8_lossy(&buf[..n]).to_string();
                        let _ = app.emit(
                            "terminal://output",
                            TerminalOutputEvent {
                                session_id: sid.clone(),
                                data,
                            },
                        );
                    }
                    Err(_) => break,
                }
            }
        });
        Ok(session_id)
    }

    pub fn write(&self, payload: TerminalWritePayload) -> Result<(), String> {
        let mut guard = self.sessions.lock();
        let session = guard
            .get_mut(&payload.session_id)
            .ok_or_else(|| "session not found".to_string())?;
        session
            .writer
            .write_all(payload.data.as_bytes())
            .map_err(|e| e.to_string())?;
        session.writer.flush().map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn resize(&self, payload: TerminalResizePayload) -> Result<(), String> {
        let guard = self.sessions.lock();
        let session = guard
            .get(&payload.session_id)
            .ok_or_else(|| "session not found".to_string())?;
        session
            .master
            .lock()
            .resize(PtySize {
                rows: payload.rows,
                cols: payload.cols,
                pixel_width: 0,
                pixel_height: 0,
            })
            .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn kill(&self, session_id: &str) -> Result<(), String> {
        self.sessions.lock().remove(session_id);
        Ok(())
    }
}

pub type SharedTerminalManager = Arc<TerminalManager>;
