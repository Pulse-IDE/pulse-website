import { useEffect, useRef } from "react";
import { applyUpdate, checkForUpdates } from "@/ipc/client";
import { isTauriRuntime } from "@/platform";

function parseVersion(value: string): number[] {
  return value
    .replace(/^v/i, "")
    .split(".")
    .map((part) => Number.parseInt(part, 10) || 0);
}

function isNewer(latest: string, current: string): boolean {
  const a = parseVersion(latest);
  const b = parseVersion(current);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i += 1) {
    const left = a[i] ?? 0;
    const right = b[i] ?? 0;
    if (left > right) {
      return true;
    }
    if (left < right) {
      return false;
    }
  }
  return false;
}

export function UpdatePrompt() {
  const checked = useRef(false);

  useEffect(() => {
    if (!isTauriRuntime() || checked.current) {
      return;
    }
    checked.current = true;

    void (async () => {
      try {
        const result = await checkForUpdates();
        if (!result.latest || !isNewer(result.latest, result.current)) {
          return;
        }
        const { ask } = await import("@tauri-apps/plugin-dialog");
        const accept = await ask(
          `Pulse ${result.latest} is available (you have ${result.current}). Download and install now?`,
          { title: "Update available", kind: "info" },
        );
        if (!accept || !result.downloadUrl) {
          return;
        }
        await applyUpdate(result.downloadUrl);
      } catch {
        /* ignore network or platform errors during startup check */
      }
    })();
  }, []);

  return null;
}
