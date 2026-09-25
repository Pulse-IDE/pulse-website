export async function invoke<T>(_cmd: string, _args?: Record<string, unknown>): Promise<T> {
  throw new Error("Tauri invoke is unavailable in the web build");
}
