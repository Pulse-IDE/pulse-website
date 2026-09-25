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
      <div className="flex items-center gap-0.5 border-b border-pulse-border bg-pulse-surface/80 px-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`group flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm ${
              tab.id === activeTabId
                ? "border-pulse-accent text-pulse-fg"
                : "border-transparent text-pulse-muted"
            }`}
          >
            <button type="button" className="max-w-[140px] truncate" onClick={() => setActiveTab(tab.id)}>
              {tab.label}
              {tab.dirty ? " •" : ""}
            </button>
            <button
              type="button"
              aria-label="Close tab"
              onClick={() => closeTab(tab.id)}
              className="rounded px-1 text-pulse-muted opacity-0 hover:bg-pulse-bg hover:text-pulse-fg group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => void saveActive()}
          className="ml-auto rounded-md bg-pulse-accent px-2.5 py-1 text-xs font-semibold text-white hover:brightness-110"
        >
          Save
        </button>
      </div>
      <div className="min-h-0 flex-1">
        {active ? (
          <MonacoEditorView tabId={active.id} path={active.path} value={active.content} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B9DFF] to-[#22D3EE] shadow-[0_0_32px_rgba(91,157,255,0.35)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
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
            <div>
              <p className="text-base font-semibold text-pulse-fg">Pulse Editor</p>
              <p className="mt-1 max-w-sm text-sm text-pulse-muted">
                Open a folder in the explorer, then pick a file to start editing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
