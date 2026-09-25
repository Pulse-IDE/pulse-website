import { useState } from "react";
import { WorkbenchIcon } from "@/components/icons/WorkbenchIcon";
import { listWorkspace, openFile } from "@/ipc/client";
import { pickWorkspaceFolder } from "@/platform/workspacePicker";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";
import type { FileEntry } from "@/types/ipc";

function TreeNode({ entry, depth }: { entry: FileEntry; depth: number }) {
  const [open, setOpen] = useState(depth < 2);
  const openTab = useWorkbenchStore((s) => s.openTab);

  const onOpen = async () => {
    if (entry.isDirectory) {
      setOpen((v) => !v);
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
    <div>
      <button
        type="button"
        onClick={() => void onOpen()}
        className="flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left text-[13px] hover:bg-white/[0.04]"
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        {entry.isDirectory ? (
          <WorkbenchIcon
            name="chevron"
            className={`h-3 w-3 shrink-0 text-pulse-muted transition-transform ${open ? "rotate-90" : ""}`}
          />
        ) : (
          <span className="inline-block w-3 shrink-0" />
        )}
        <WorkbenchIcon
          name={entry.isDirectory ? "folder" : "file"}
          className={`h-3.5 w-3.5 shrink-0 ${entry.isDirectory ? "text-[#5B9DFF]" : "text-pulse-muted"}`}
        />
        <span className="truncate text-pulse-fg/90">{entry.name}</span>
      </button>
      {entry.isDirectory && open && entry.children
        ? entry.children.map((child) => (
            <TreeNode key={child.path} entry={child} depth={depth + 1} />
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
        <span className="text-[11px] font-bold uppercase tracking-wider text-pulse-muted">
          Explorer
        </span>
        <button
          type="button"
          onClick={() => void pickFolder()}
          className="rounded-md bg-pulse-accent px-2.5 py-1 text-[11px] font-semibold text-white hover:brightness-110"
        >
          Open folder
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto py-1">
        {root ? (
          tree.map((entry) => <TreeNode key={entry.path} entry={entry} depth={0} />)
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-5 py-10 text-center">
            <div className="rounded-xl border border-dashed border-pulse-border bg-pulse-bg/50 p-4">
              <WorkbenchIcon name="folder" className="mx-auto h-8 w-8 text-pulse-accent" />
            </div>
            <p className="text-sm font-semibold text-pulse-fg">Open a project folder</p>
            <p className="text-xs leading-relaxed text-pulse-muted">
              Browse files, edit with Monaco, and save changes back to disk.
            </p>
            <button
              type="button"
              onClick={() => void pickFolder()}
              className="mt-1 rounded-md bg-pulse-accent px-4 py-2 text-xs font-semibold text-white"
            >
              Choose folder…
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
