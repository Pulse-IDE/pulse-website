import { useWorkbenchStore, type SidebarPanel } from "@/store/useWorkbenchStore";

const items: Array<{ id: SidebarPanel; label: string }> = [
  { id: "explorer", label: "Explorer" },
  { id: "scm", label: "Source Control" },
  { id: "extensions", label: "Extensions" },
  { id: "settings", label: "Settings" },
];

export function ActivityBar() {
  const panel = useWorkbenchStore((s) => s.sidebarPanel);
  const setPanel = useWorkbenchStore((s) => s.setSidebarPanel);
  const toggleTerminal = useWorkbenchStore((s) => s.setTerminalVisible);
  const terminalVisible = useWorkbenchStore((s) => s.terminalVisible);

  return (
    <nav className="flex w-12 flex-col items-center gap-2 border-r border-pulse-border bg-pulse-sidebar py-3">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-label={item.label}
          onClick={() => setPanel(item.id)}
          className={`h-9 w-9 rounded-md text-[10px] font-semibold tracking-wide ${
            panel === item.id
              ? "bg-pulse-accent text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
              : "text-pulse-muted hover:bg-pulse-surface"
          }`}
        >
          {item.label.slice(0, 2).toUpperCase()}
        </button>
      ))}
      <button
        type="button"
        aria-label="Terminal"
        onClick={() => toggleTerminal(!terminalVisible)}
        className={`mt-auto h-9 w-9 rounded text-xs font-medium ${
          terminalVisible
            ? "bg-pulse-accent text-white"
            : "text-pulse-muted hover:bg-pulse-surface"
        }`}
      >
        TM
      </button>
    </nav>
  );
}
