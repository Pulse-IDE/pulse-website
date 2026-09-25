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
        className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-pulse-bg"
      >
        <span className="text-pulse-muted">{entry.isDirectory ? "D" : "F"}</span>
        <span className="truncate">{entry.name}</span>
      </button>
      {entry.isDirectory && entry.children
        ? entry.children.map((child) => (
            <TreeNode key={child.path} entry={child} />
          ))
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
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-pulse-border px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-pulse-muted">
          Explorer
        </span>
        <button
          type="button"
          onClick={() => void pickFolder()}
          className="rounded bg-pulse-accent px-2 py-1 text-xs text-white"
        >
          Open
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-2">
        {root ? (
          tree.map((entry) => <TreeNode key={entry.path} entry={entry} />)
        ) : (
          <p className="px-2 text-sm text-pulse-muted">Open a workspace folder</p>
        )}
      </div>
    </div>
  );
}
