import { isTauriRuntime } from "@/platform";

type TauriClient = typeof import("@/ipc/client.tauri");
type WebClient = typeof import("@/ipc/client.web");

let cached: TauriClient | WebClient | null = null;

async function client(): Promise<TauriClient | WebClient> {
  if (cached) {
    return cached;
  }
  cached = isTauriRuntime()
    ? await import("@/ipc/client.tauri")
    : await import("@/ipc/client.web");
  return cached;
}

export async function openFile(path: string) {
  return (await client()).openFile(path);
}

export async function writeFile(path: string, content: string) {
  return (await client()).writeFile(path, content);
}

export async function listWorkspace(root: string, maxDepth: number) {
  return (await client()).listWorkspace(root, maxDepth);
}

export async function gitBranch(root: string) {
  return (await client()).gitBranch(root);
}

export async function gitStatus(root: string) {
  return (await client()).gitStatus(root);
}

export async function terminalCreate(payload: Parameters<TauriClient["terminalCreate"]>[0]) {
  return (await client()).terminalCreate(payload);
}

export async function terminalWrite(payload: Parameters<TauriClient["terminalWrite"]>[0]) {
  return (await client()).terminalWrite(payload);
}

export async function terminalResize(payload: Parameters<TauriClient["terminalResize"]>[0]) {
  return (await client()).terminalResize(payload);
}

export async function terminalKill(sessionId: string) {
  return (await client()).terminalKill(sessionId);
}

export async function lspInitialize(payload: Parameters<TauriClient["lspInitialize"]>[0]) {
  return (await client()).lspInitialize(payload);
}

export async function lspDispatch(payload: Parameters<TauriClient["lspDispatch"]>[0]) {
  return (await client()).lspDispatch(payload);
}

export async function lspShutdown(sessionId: string) {
  return (await client()).lspShutdown(sessionId);
}

export async function dapLaunch(payload: Parameters<TauriClient["dapLaunch"]>[0]) {
  return (await client()).dapLaunch(payload);
}

export async function dapDispatch(payload: Parameters<TauriClient["dapDispatch"]>[0]) {
  return (await client()).dapDispatch(payload);
}

export async function dapTerminate(sessionId: string) {
  return (await client()).dapTerminate(sessionId);
}

export async function checkForUpdates() {
  return (await client()).checkForUpdates();
}

export async function applyUpdate(downloadUrl: string) {
  return (await client()).applyUpdate(downloadUrl);
}
