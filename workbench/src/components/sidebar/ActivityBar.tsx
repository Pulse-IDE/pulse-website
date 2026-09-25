import type { ReactNode } from "react";
import { PulseMark } from "@/components/brand/PulseMark";
import { WorkbenchIcon } from "@/components/icons/WorkbenchIcon";
import { useWorkbenchStore, type SidebarPanel } from "@/store/useWorkbenchStore";

const items: Array<{ id: SidebarPanel; label: string; icon: "files" | "git" | "extensions" | "settings" }> = [
  { id: "explorer", label: "Explorer", icon: "files" },
  { id: "scm", label: "Source Control", icon: "git" },
  { id: "extensions", label: "Extensions", icon: "extensions" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function ActivityButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
        active
          ? "bg-pulse-accent/15 text-pulse-accent"
          : "text-pulse-muted hover:bg-white/5 hover:text-pulse-fg"
      }`}
    >
      {active ? (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-pulse-accent" />
      ) : null}
      {children}
    </button>
  );
}

export function ActivityBar() {
  const panel = useWorkbenchStore((s) => s.sidebarPanel);
  const setPanel = useWorkbenchStore((s) => s.setSidebarPanel);
  const toggleTerminal = useWorkbenchStore((s) => s.setTerminalVisible);
  const terminalVisible = useWorkbenchStore((s) => s.terminalVisible);

  return (
    <nav className="flex w-[52px] shrink-0 flex-col items-center gap-0.5 border-r border-pulse-border bg-[#060910] py-2">
      <div className="mb-2">
        <PulseMark size="md" />
      </div>
      {items.map((item) => (
        <ActivityButton
          key={item.id}
          label={item.label}
          active={panel === item.id}
          onClick={() => setPanel(item.id)}
        >
          <WorkbenchIcon name={item.icon} className="h-[18px] w-[18px]" />
        </ActivityButton>
      ))}
      <div className="mt-auto">
        <ActivityButton
          label="Terminal"
          active={terminalVisible}
          onClick={() => toggleTerminal(!terminalVisible)}
        >
          <WorkbenchIcon name="terminal" className="h-[18px] w-[18px]" />
        </ActivityButton>
      </div>
    </nav>
  );
}
