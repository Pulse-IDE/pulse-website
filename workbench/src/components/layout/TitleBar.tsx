import { PulseMark } from "@/components/brand/PulseMark";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";

export function TitleBar() {
  const root = useWorkbenchStore((s) => s.workspaceRoot);
  const tabs = useWorkbenchStore((s) => s.tabs.length);

  return (
    <header className="flex h-10 shrink-0 items-center gap-3 border-b border-pulse-border bg-[#070a10] px-3">
      <PulseMark size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-pulse-fg">Pulse IDE</p>
        <p className="truncate text-[10px] text-pulse-muted">
          {root ?? "No workspace"} · {tabs} {tabs === 1 ? "tab" : "tabs"}
        </p>
      </div>
      <div className="hidden items-center gap-1 sm:flex">
        <span className="rounded-md border border-pulse-border px-2 py-0.5 text-[10px] font-medium text-pulse-muted">
          Ctrl+S save
        </span>
      </div>
    </header>
  );
}
