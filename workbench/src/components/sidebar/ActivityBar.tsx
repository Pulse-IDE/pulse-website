import type { ReactNode } from "react";
import { useWorkbenchStore, type SidebarPanel } from "@/store/useWorkbenchStore";

const items: Array<{ id: SidebarPanel; label: string; icon: ReactNode }> = [
  {
    id: "explorer",
    label: "Explorer",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7h16M4 12h10M4 17h14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "scm",
    label: "Source Control",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="12" r="2" />
        <path d="M6 8v8M8 6h5a3 3 0 0 1 3 3v3" />
      </svg>
    ),
  },
  {
    id: "extensions",
    label: "Extensions",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2 4 4 .5-3 3 .5 4-4-2-4 2 .5-4-3-3 4-.5z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
];

export function ActivityBar() {
  const panel = useWorkbenchStore((s) => s.sidebarPanel);
  const setPanel = useWorkbenchStore((s) => s.setSidebarPanel);
  const toggleTerminal = useWorkbenchStore((s) => s.setTerminalVisible);
  const terminalVisible = useWorkbenchStore((s) => s.terminalVisible);

  return (
    <nav className="flex w-14 flex-col items-center gap-1 border-r border-pulse-border bg-pulse-sidebar py-3">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B9DFF] to-[#22D3EE] shadow-[0_0_20px_rgba(91,157,255,0.35)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="M4 14h4l2-6 4 12 2-6h4"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-label={item.label}
          title={item.label}
          onClick={() => setPanel(item.id)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            panel === item.id
              ? "bg-pulse-accent/20 text-pulse-accent ring-1 ring-pulse-accent/40"
              : "text-pulse-muted hover:bg-pulse-surface hover:text-pulse-fg"
          }`}
        >
          {item.icon}
        </button>
      ))}
      <button
        type="button"
        aria-label="Terminal"
        title="Terminal"
        onClick={() => toggleTerminal(!terminalVisible)}
        className={`mt-auto flex h-10 w-10 items-center justify-center rounded-lg ${
          terminalVisible
            ? "bg-pulse-accent/20 text-pulse-accent ring-1 ring-pulse-accent/40"
            : "text-pulse-muted hover:bg-pulse-surface hover:text-pulse-fg"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 17l6-5-6-5M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}
