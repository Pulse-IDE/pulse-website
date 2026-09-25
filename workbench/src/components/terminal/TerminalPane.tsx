import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import XTerm from "@xterm/xterm";

const Terminal =
  (XTerm as unknown as { Terminal: typeof import("@xterm/xterm").Terminal })
    .Terminal ?? XTerm;
import {
  terminalCreate,
  terminalKill,
  terminalResize,
  terminalWrite,
} from "@/ipc/client";
import { drainWebTerminalOutput } from "@/ipc/client.web";
import type { TerminalOutputEvent } from "@/types/ipc";
import { isTauriRuntime } from "@/platform";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";
import "@xterm/xterm/css/xterm.css";

export function TerminalPane() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sessionRef = useRef<string | null>(null);
  const workspaceRoot = useWorkbenchStore((s) => s.workspaceRoot);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const term = new Terminal({
      convertEol: true,
      fontFamily: "ui-monospace, monospace",
      fontSize: 13,
      theme: {
        background: "#0d1117",
        foreground: "#e6edf3",
      },
    });
    const fit = new FitAddon();
    const links = new WebLinksAddon();
    term.loadAddon(fit);
    term.loadAddon(links);
    term.open(container);
    fit.fit();

    let unlisten: (() => void) | undefined;
    let pollTimer: number | undefined;
    let disposed = false;

    const syncSize = () => {
      fit.fit();
      const sid = sessionRef.current;
      if (!sid) {
        return;
      }
      void terminalResize({
        sessionId: sid,
        cols: term.cols,
        rows: term.rows,
      });
    };

    const boot = async () => {
      const sessionId = await terminalCreate({
        cwd: workspaceRoot ?? undefined,
        cols: term.cols,
        rows: term.rows,
      });
      if (disposed) {
        await terminalKill(sessionId);
        return;
      }
      sessionRef.current = sessionId;

      if (isTauriRuntime()) {
        const { listen } = await import("@tauri-apps/api/event");
        unlisten = await listen<TerminalOutputEvent>(
          "terminal://output",
          (event) => {
            if (event.payload.sessionId === sessionId) {
              term.write(event.payload.data);
            }
          },
        );
      } else {
        pollTimer = window.setInterval(() => {
          const chunk = drainWebTerminalOutput(sessionId);
          if (chunk) {
            term.write(chunk);
          }
        }, 120);
        const initial = drainWebTerminalOutput(sessionId);
        if (initial) {
          term.write(initial);
        }
      }

      term.onData((data) => {
        void terminalWrite({ sessionId, data });
        if (!isTauriRuntime()) {
          window.setTimeout(() => {
            const chunk = drainWebTerminalOutput(sessionId);
            if (chunk) {
              term.write(chunk);
            }
          }, 0);
        }
      });
    };

    void boot();

    window.addEventListener("resize", syncSize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", syncSize);
      if (pollTimer) {
        window.clearInterval(pollTimer);
      }
      if (unlisten) {
        unlisten();
      }
      const sid = sessionRef.current;
      if (sid) {
        void terminalKill(sid);
      }
      term.dispose();
    };
  }, [workspaceRoot]);

  return (
    <div className="flex h-full flex-col bg-pulse-bg">
      <header className="border-b border-pulse-border px-3 py-1 text-xs uppercase tracking-wide text-pulse-muted">
        Terminal
      </header>
      <div ref={containerRef} className="min-h-0 flex-1 p-2" />
    </div>
  );
}
