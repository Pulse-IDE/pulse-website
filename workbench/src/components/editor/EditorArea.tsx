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
      <div className="flex items-center gap-1 border-b border-pulse-border bg-pulse-surface px-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 border-b-2 px-3 py-2 text-sm ${
              tab.id === activeTabId
                ? "border-pulse-accent text-pulse-fg"
                : "border-transparent text-pulse-muted"
            }`}
          >
            <button type="button" onClick={() => setActiveTab(tab.id)}>
              {tab.label}
              {tab.dirty ? "*" : ""}
            </button>
            <button
              type="button"
              aria-label="Close tab"
              onClick={() => closeTab(tab.id)}
              className="text-pulse-muted hover:text-pulse-fg"
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => void saveActive()}
          className="ml-auto rounded bg-pulse-accent px-2 py-1 text-xs text-white"
        >
          Save
        </button>
      </div>
      <div className="min-h-0 flex-1">
        {active ? (
          <MonacoEditorView tabId={active.id} path={active.path} value={active.content} />
        ) : (
          <div className="flex h-full items-center justify-center text-pulse-muted">
            Open a file from the explorer
          </div>
        )}
      </div>
    </div>
  );
}
