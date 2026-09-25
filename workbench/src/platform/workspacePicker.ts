import { isTauriRuntime } from "@/platform";
import {
  hasDirectoryPicker,
  pickWebWorkspaceFolder,
} from "@/ipc/webWorkspace";

export async function pickWorkspaceFolder(): Promise<string | null> {
  if (isTauriRuntime()) {
    const { open } = await import("@tauri-apps/plugin-dialog");
    const selected = await open({ directory: true, multiple: false });
    return typeof selected === "string" ? selected : null;
  }
  if (!hasDirectoryPicker()) {
    throw new Error(
      "This browser does not support folder access. Use Chrome, Edge, or the desktop app.",
    );
  }
  return pickWebWorkspaceFolder();
}
