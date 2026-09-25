import { listWorkspace, openFile } from "@/ipc/client";
import { pickWorkspaceFolder } from "@/platform/workspacePicker";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";
import type { FileEntry } from "@/types/ipc";

function TreeNode({ entry }: { entry: FileEntry }) {
  const openTab = useWorkbenchStore((s) => s.openTab);

  const onOpen = async () => {
    if (entry.isDirectory) {
      return;
    }
    const file = await openFile(entry.path);
    openTab({
      id: file.path,
      path: file.path,
      label: entry.name,
      content: file.content,
      dirty: false,
    });
  };

  return (
    <div className="pl-2">
      <button
        type="button"
        onClick={() => void onOpen()}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-pulse-bg/80"
      >
        <span className="text-pulse-muted">{entry.isDirectory ? "📁" : "📄"}</span>
        <span className="truncate">{entry.name}</span>
      </button>
      {entry.isDirectory && entry.children
        ? entry.children.map((child) => <TreeNode key={child.path} entry={child} />)
        : null}
    </div>
  );
}

export function FileExplorer() {
  const tree = useWorkbenchStore((s) => s.tree);
  const root = useWorkbenchStore((s) => s.workspaceRoot);
  const setRoot = useWorkbenchStore((s) => s.setWorkspaceRoot);
  const setTree = useWorkbenchStore((s) => s.setTree);

  const pickFolder = async () => {
    const selected = await pickWorkspaceFolder();
    if (!selected) {
      return;
    }
    setRoot(selected);
    const entries = await listWorkspace(selected, 4);
    setTree(entries);
  };

  return (
    <div className="flex h-full flex-col bg-pulse-sidebar/50">
      <header className="flex items-center justify-between border-b border-pulse-border px-3 py-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-pulse-muted">Explorer</span>
        <button
          type="button"
          onClick={() => void pickFolder()}
          className="rounded-md bg-pulse-accent px-2.5 py-1 text-[11px] font-semibold text-white hover:brightness-110"
        >
          Open folder
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-2">
        {root ? (
          tree.map((entry) => <TreeNode key={entry.path} entry={entry} />)
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-8 text-center">
            <p className="text-sm font-medium text-pulse-fg">No workspace yet</p>
            <p className="text-xs leading-relaxed text-pulse-muted">
              Choose a project folder to browse and edit files with Monaco.
            </p>
            <button
              type="button"
              onClick={() => void pickFolder()}
              className="mt-1 rounded-md border border-pulse-border bg-pulse-surface px-3 py-1.5 text-xs font-semibold text-pulse-fg hover:border-pulse-accent/50"
            >
              Open folder…
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
