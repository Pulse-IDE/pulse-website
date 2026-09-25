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
import {
  getWebWorkspaceRoot,
  listWebWorkspace,
  openWebFile,
  writeWebFile,
} from "@/ipc/webWorkspace";

const webTerminalSessions = new Map<
  string,
  { buffer: string[]; cwd: string | undefined }
>();

function notAvailable(feature: string): never {
  throw new Error(`${feature} is available in the desktop app only`);
}

export async function openFile(path: string): Promise<OpenFileResult> {
  const file = await openWebFile(path);
  if (!file) {
    throw new Error(`unable to open ${path}`);
  }
  return file;
}

export async function writeFile(path: string, content: string): Promise<void> {
  await writeWebFile(path, content);
}

export async function listWorkspace(
  _root: string,
  maxDepth: number,
): Promise<FileEntry[]> {
  return listWebWorkspace(maxDepth);
}

export async function gitBranch(_root: string): Promise<GitBranchInfo> {
  return { branch: "web", isClean: true };
}

export async function gitStatus(_root: string): Promise<GitStatusEntry[]> {
  return [];
}

export async function terminalCreate(
  payload: TerminalCreatePayload,
): Promise<string> {
  const sessionId = crypto.randomUUID();
  webTerminalSessions.set(sessionId, {
    buffer: [
      "Pulse Web Terminal (limited)\r\n",
      "Full shell is available in the desktop app.\r\n",
      "Type help for commands.\r\n\r\n",
    ],
    cwd: payload.cwd,
  });
  return sessionId;
}

export async function terminalWrite(
  payload: TerminalWritePayload,
): Promise<void> {
  const session = webTerminalSessions.get(payload.sessionId);
  if (!session) {
    return;
  }
  const input = payload.data.replace(/\r?\n/g, "\n");
  const line = input.trim();
  if (line === "help") {
    session.buffer.push(
      "Commands: help, clear, pwd, echo <text>\r\n\r\n",
    );
    return;
  }
  if (line === "clear") {
    session.buffer = [];
    return;
  }
  if (line === "pwd") {
    session.buffer.push(`${session.cwd ?? getWebWorkspaceRoot() ?? "/"}\r\n\r\n`);
    return;
  }
  if (line.startsWith("echo ")) {
    session.buffer.push(`${line.slice(5)}\r\n\r\n`);
    return;
  }
  if (line.length > 0) {
    session.buffer.push(`command not found: ${line}\r\n\r\n`);
  }
}

export async function terminalResize(
  _payload: TerminalResizePayload,
): Promise<void> {
  /* no-op on web */
}

export async function terminalKill(sessionId: string): Promise<void> {
  webTerminalSessions.delete(sessionId);
}

export function drainWebTerminalOutput(sessionId: string): string {
  const session = webTerminalSessions.get(sessionId);
  if (!session || session.buffer.length === 0) {
    return "";
  }
  const chunk = session.buffer.join("");
  session.buffer = [];
  return chunk;
}

export async function lspInitialize(
  _payload: LspInitializePayload,
): Promise<string> {
  notAvailable("Language Server Protocol");
}

export async function lspDispatch(_payload: LspDispatchPayload): Promise<void> {
  notAvailable("Language Server Protocol");
}

export async function lspShutdown(_sessionId: string): Promise<void> {
  /* no-op */
}

export async function dapLaunch(_payload: DapLaunchPayload): Promise<string> {
  notAvailable("Debug Adapter Protocol");
}

export async function dapDispatch(_payload: DapDispatchPayload): Promise<void> {
  notAvailable("Debug Adapter Protocol");
}

export async function dapTerminate(_sessionId: string): Promise<void> {
  /* no-op */
}

export async function checkForUpdates(): Promise<{
  current: string;
  latest: string | null;
  downloadUrl: string | null;
}> {
  return {
    current: import.meta.env.VITE_APP_VERSION ?? "0.0.0",
    latest: null,
    downloadUrl: null,
  };
}

export async function applyUpdate(_downloadUrl: string): Promise<void> {
  /* web uses desktop builds */
}
