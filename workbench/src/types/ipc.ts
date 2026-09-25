export type IpcCommandMap = {
  ipc_open_file: {
    input: { path: string };
    output: OpenFileResult;
  };
  ipc_write_file: {
    input: { path: string; content: string };
    output: void;
  };
  ipc_list_workspace: {
    input: { root: string; maxDepth: number };
    output: FileEntry[];
  };
  ipc_git_branch: {
    input: { root: string };
    output: GitBranchInfo;
  };
  ipc_git_status: {
    input: { root: string };
    output: GitStatusEntry[];
  };
  ipc_terminal_create: {
    input: { payload: TerminalCreatePayload };
    output: string;
  };
  ipc_terminal_write: {
    input: { payload: TerminalWritePayload };
    output: void;
  };
  ipc_terminal_resize: {
    input: { payload: TerminalResizePayload };
    output: void;
  };
  ipc_terminal_kill: {
    input: { sessionId: string };
    output: void;
  };
  ipc_lsp_initialize: {
    input: { payload: LspInitializePayload };
    output: string;
  };
  ipc_lsp_dispatch: {
    input: { payload: LspDispatchPayload };
    output: void;
  };
  ipc_lsp_shutdown: {
    input: { sessionId: string };
    output: void;
  };
  ipc_dap_launch: {
    input: { payload: DapLaunchPayload };
    output: string;
  };
  ipc_dap_dispatch: {
    input: { payload: DapDispatchPayload };
    output: void;
  };
  ipc_dap_terminate: {
    input: { sessionId: string };
    output: void;
  };
};

export type IpcCommand = keyof IpcCommandMap;

export interface OpenFileResult {
  path: string;
  content: string;
}

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileEntry[];
}

export interface GitBranchInfo {
  branch: string;
  isClean: boolean;
}

export interface GitStatusEntry {
  path: string;
  indexStatus: string;
  worktreeStatus: string;
}

export interface TerminalCreatePayload {
  cwd?: string;
  cols: number;
  rows: number;
}

export interface TerminalWritePayload {
  sessionId: string;
  data: string;
}

export interface TerminalResizePayload {
  sessionId: string;
  cols: number;
  rows: number;
}

export interface TerminalOutputEvent {
  sessionId: string;
  data: string;
}

export interface LspInitializePayload {
  languageId: string;
  rootUri: string;
  serverCommand: string[];
}

export interface LspDispatchPayload {
  sessionId: string;
  method: string;
  params: Record<string, unknown>;
}

export interface LspEvent {
  sessionId: string;
  method: string;
  params: Record<string, unknown>;
}

export interface DapLaunchPayload {
  adapterCommand: string[];
  program: string;
  cwd: string;
}

export interface DapDispatchPayload {
  sessionId: string;
  command: string;
  arguments: Record<string, unknown>;
}

export interface DapEvent {
  sessionId: string;
  command: string;
  body: Record<string, unknown>;
}
