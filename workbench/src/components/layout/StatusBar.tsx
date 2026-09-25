import { useWorkbenchStore } from "@/store/useWorkbenchStore";

export function StatusBar() {
  const root = useWorkbenchStore((s) => s.workspaceRoot);
  const active = useWorkbenchStore((s) =>
    s.tabs.find((t) => t.id === s.activeTabId),
  );

  return (
    <footer className="flex h-6 items-center justify-between border-t border-pulse-border bg-pulse-surface px-3 text-xs text-pulse-muted">
      <span>{root ?? "No workspace"}</span>
      <span>{active ? active.path : "Ready"}</span>
    </footer>
  );
}
