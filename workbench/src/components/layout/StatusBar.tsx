import { PulseMark } from "@/components/brand/PulseMark";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";

export function StatusBar() {
  const root = useWorkbenchStore((s) => s.workspaceRoot);
  const active = useWorkbenchStore((s) =>
    s.tabs.find((t) => t.id === s.activeTabId),
  );
  const panel = useWorkbenchStore((s) => s.sidebarPanel);

  return (
    <footer className="flex h-7 shrink-0 items-center gap-3 border-t border-pulse-border bg-[#070a10] px-2 text-[11px] text-pulse-muted">
      <PulseMark size="sm" className="!h-5 !w-5 !shadow-none" />
      <span className="hidden truncate sm:inline">{root ?? "Open a folder to begin"}</span>
      <span className="h-3 w-px bg-pulse-border" aria-hidden />
      <span className="capitalize">{panel}</span>
      <span className="ml-auto truncate font-mono text-[10px]">
        {active ? active.label : "Ready"}
      </span>
    </footer>
  );
}
