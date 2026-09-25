mod dap;
mod fs_ops;
mod lsp;
mod scm;
mod terminal;
mod update;

use dap::{DapDispatchPayload, DapHub, DapLaunchPayload};
use fs_ops::{list_workspace_tree, read_text_file, write_text_file, FileEntry, OpenFileResult};
use lsp::{LspDispatchPayload, LspHub, LspInitializePayload};
use scm::{git_branch, git_status, GitBranchInfo, GitStatusEntry};
use std::sync::Arc;
use terminal::{
    SharedTerminalManager, TerminalCreatePayload, TerminalManager, TerminalResizePayload,
    TerminalWritePayload,
};

#[tauri::command]
fn ipc_open_file(path: String) -> Result<OpenFileResult, String> {
    read_text_file(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn ipc_write_file(path: String, content: String) -> Result<(), String> {
    write_text_file(&path, &content).map_err(|e| e.to_string())
}

#[tauri::command]
fn ipc_list_workspace(root: String, max_depth: u8) -> Result<Vec<FileEntry>, String> {
    list_workspace_tree(&root, max_depth).map_err(|e| e.to_string())
}

#[tauri::command]
fn ipc_git_branch(root: String) -> Result<GitBranchInfo, String> {
    git_branch(&root)
}

#[tauri::command]
fn ipc_git_status(root: String) -> Result<Vec<GitStatusEntry>, String> {
    git_status(&root)
}

#[tauri::command]
fn ipc_terminal_create(
    app: tauri::AppHandle,
    state: tauri::State<'_, SharedTerminalManager>,
    payload: TerminalCreatePayload,
) -> Result<String, String> {
    state.create(app, payload)
}

#[tauri::command]
fn ipc_terminal_write(
    state: tauri::State<'_, SharedTerminalManager>,
    payload: TerminalWritePayload,
) -> Result<(), String> {
    state.write(payload)
}

#[tauri::command]
fn ipc_terminal_resize(
    state: tauri::State<'_, SharedTerminalManager>,
    payload: TerminalResizePayload,
) -> Result<(), String> {
    state.resize(payload)
}

#[tauri::command]
fn ipc_terminal_kill(
    state: tauri::State<'_, SharedTerminalManager>,
    session_id: String,
) -> Result<(), String> {
    state.kill(&session_id)
}

#[tauri::command]
fn ipc_lsp_initialize(
    state: tauri::State<'_, Arc<LspHub>>,
    payload: LspInitializePayload,
) -> Result<String, String> {
    state.initialize(payload)
}

#[tauri::command]
fn ipc_lsp_dispatch(
    app: tauri::AppHandle,
    state: tauri::State<'_, Arc<LspHub>>,
    payload: LspDispatchPayload,
) -> Result<(), String> {
    state.dispatch(app, payload)
}

#[tauri::command]
fn ipc_lsp_shutdown(
    state: tauri::State<'_, Arc<LspHub>>,
    session_id: String,
) -> Result<(), String> {
    state.shutdown(&session_id)
}

#[tauri::command]
fn ipc_dap_launch(
    state: tauri::State<'_, Arc<DapHub>>,
    payload: DapLaunchPayload,
) -> Result<String, String> {
    state.launch(payload)
}

#[tauri::command]
fn ipc_dap_dispatch(
    app: tauri::AppHandle,
    state: tauri::State<'_, Arc<DapHub>>,
    payload: DapDispatchPayload,
) -> Result<(), String> {
    state.dispatch(app, payload)
}

#[tauri::command]
fn ipc_dap_terminate(
    state: tauri::State<'_, Arc<DapHub>>,
    session_id: String,
) -> Result<(), String> {
    state.terminate(&session_id)
}

#[tauri::command]
fn ipc_check_for_updates(app: tauri::AppHandle) -> Result<update::UpdateCheckResult, String> {
    let current = app.package_info().version.to_string();
    update::check_for_updates(&current)
}

#[tauri::command]
fn ipc_apply_update(app: tauri::AppHandle, download_url: String) -> Result<(), String> {
    update::apply_update(&app, &download_url)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let terminals: SharedTerminalManager = Arc::new(TerminalManager::new());
    let lsp: Arc<LspHub> = Arc::new(LspHub::new());
    let dap: Arc<DapHub> = Arc::new(DapHub::new());
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .manage(terminals)
        .manage(lsp)
        .manage(dap)
        .invoke_handler(tauri::generate_handler![
            ipc_open_file,
            ipc_write_file,
            ipc_list_workspace,
            ipc_git_branch,
            ipc_git_status,
            ipc_terminal_create,
            ipc_terminal_write,
            ipc_terminal_resize,
            ipc_terminal_kill,
            ipc_lsp_initialize,
            ipc_lsp_dispatch,
            ipc_lsp_shutdown,
            ipc_dap_launch,
            ipc_dap_dispatch,
            ipc_dap_terminate,
            ipc_check_for_updates,
            ipc_apply_update,
        ])
        .run(tauri::generate_context!())
        .expect("pulse startup failed");
}
