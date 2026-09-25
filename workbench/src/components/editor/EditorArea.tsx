import { PulseMark } from "@/components/brand/PulseMark";
import { writeFile } from "@/ipc/client";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";
import { MonacoEditorView } from "@/components/editor/MonacoEditorView";

export function EditorArea() {
  const tabs = useWorkbenchStore((s) => s.tabs);
  const activeTabId = useWorkbenchStore((s) => s.activeTabId);
  const setActiveTab = useWorkbenchStore((s) => s.setActiveTab);
  const closeTab = useWorkbenchStore((s) => s.closeTab);
  const markTabSaved = useWorkbenchStore((s) => s.markTabSaved);
  const active = tabs.find((t) => t.id === activeTabId) ?? null;

  const saveActive = async () => {
    if (!active) {
      return;
    }
    await writeFile(active.path, active.content);
    markTabSaved(active.id);
  };

  return (
    <div className="flex h-full flex-col bg-pulse-bg">
      <div className="flex items-end gap-px overflow-x-auto border-b border-pulse-border bg-[#070a10] px-1 pt-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`group flex max-w-[200px] items-center gap-1 rounded-t-md border border-b-0 px-2.5 py-1.5 text-xs ${
              tab.id === activeTabId
                ? "border-pulse-border bg-pulse-bg text-pulse-fg"
                : "border-transparent bg-transparent text-pulse-muted hover:text-pulse-fg"
            }`}
          >
            <button type="button" className="truncate" onClick={() => setActiveTab(tab.id)}>
              {tab.label}
              {tab.dirty ? " •" : ""}
            </button>
            <button
              type="button"
              aria-label="Close tab"
              onClick={() => closeTab(tab.id)}
              className="rounded px-1 opacity-60 hover:bg-white/10 hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => void saveActive()}
          disabled={!active}
          className="ml-auto mb-1 mr-1 rounded-md bg-pulse-accent px-2.5 py-1 text-[11px] font-semibold text-white disabled:opacity-40"
        >
          Save
        </button>
      </div>
      <div className="min-h-0 flex-1">
        {active ? (
          <MonacoEditorView tabId={active.id} path={active.path} value={active.content} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <PulseMark size="md" />
            <div>
              <p className="text-lg font-semibold text-pulse-fg">Welcome to Pulse</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-pulse-muted">
                Open a folder from the explorer, then select a file to edit. Your workspace stays
                on your machine — no telemetry, no cloud upload.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
