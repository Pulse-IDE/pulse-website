import { invoke } from "@tauri-apps/api/core";
import type {
  DapDispatchPayload,
  DapLaunchPayload,
  FileEntry,
  GitBranchInfo,
  GitStatusEntry,
  LspDispatchPayload,
  LspInitializePayload,
  OpenFileResult,
  TerminalCreatePayload,
  TerminalResizePayload,
  TerminalWritePayload,
} from "@/types/ipc";

export async function openFile(path: string): Promise<OpenFileResult> {
  return invoke<OpenFileResult>("ipc_open_file", { path });
}

export async function writeFile(path: string, content: string): Promise<void> {
  return invoke<void>("ipc_write_file", { path, content });
}

export async function listWorkspace(
  root: string,
  maxDepth: number,
): Promise<FileEntry[]> {
  return invoke<FileEntry[]>("ipc_list_workspace", { root, maxDepth });
}

export async function gitBranch(root: string): Promise<GitBranchInfo> {
  return invoke<GitBranchInfo>("ipc_git_branch", { root });
}

export async function gitStatus(root: string): Promise<GitStatusEntry[]> {
  return invoke<GitStatusEntry[]>("ipc_git_status", { root });
}

export async function terminalCreate(
  payload: TerminalCreatePayload,
): Promise<string> {
  return invoke<string>("ipc_terminal_create", { payload });
}

export async function terminalWrite(
  payload: TerminalWritePayload,
): Promise<void> {
  return invoke<void>("ipc_terminal_write", { payload });
}

export async function terminalResize(
  payload: TerminalResizePayload,
): Promise<void> {
  return invoke<void>("ipc_terminal_resize", { payload });
}

export async function terminalKill(sessionId: string): Promise<void> {
  return invoke<void>("ipc_terminal_kill", { sessionId });
}

export async function lspInitialize(
  payload: LspInitializePayload,
): Promise<string> {
  return invoke<string>("ipc_lsp_initialize", { payload });
}

export async function lspDispatch(payload: LspDispatchPayload): Promise<void> {
  return invoke<void>("ipc_lsp_dispatch", { payload });
}

export async function lspShutdown(sessionId: string): Promise<void> {
  return invoke<void>("ipc_lsp_shutdown", { sessionId });
}

export async function dapLaunch(payload: DapLaunchPayload): Promise<string> {
  return invoke<string>("ipc_dap_launch", { payload });
}

export async function dapDispatch(payload: DapDispatchPayload): Promise<void> {
  return invoke<void>("ipc_dap_dispatch", { payload });
}

export async function dapTerminate(sessionId: string): Promise<void> {
  return invoke<void>("ipc_dap_terminate", { sessionId });
}

export async function checkForUpdates(): Promise<{
  current: string;
  latest: string | null;
  downloadUrl: string | null;
}> {
  return invoke("ipc_check_for_updates");
}

export async function applyUpdate(downloadUrl: string): Promise<void> {
  return invoke<void>("ipc_apply_update", { downloadUrl });
}
