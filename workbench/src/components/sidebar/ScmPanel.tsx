import { useCallback, useEffect, useState } from "react";
import { gitBranch, gitStatus } from "@/ipc/client";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";
import type { GitBranchInfo, GitStatusEntry } from "@/types/ipc";

export function ScmPanel() {
  const root = useWorkbenchStore((s) => s.workspaceRoot);
  const [branch, setBranch] = useState<GitBranchInfo | null>(null);
  const [entries, setEntries] = useState<GitStatusEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!root) {
      setBranch(null);
      setEntries([]);
      setError(null);
      return;
    }
    try {
      const [branchInfo, statusEntries] = await Promise.all([
        gitBranch(root),
        gitStatus(root),
      ]);
      setBranch(branchInfo);
      setEntries(statusEntries);
      setError(null);
    } catch (caught) {
      setBranch(null);
      setEntries([]);
      setError(caught instanceof Error ? caught.message : "git unavailable");
    }
  }, [root]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-pulse-border px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-pulse-muted">
          Source Control
        </span>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded bg-pulse-accent px-2 py-1 text-xs text-white"
        >
          Refresh
        </button>
      </header>
      <div className="flex-1 overflow-auto p-3 text-sm">
        {!root ? <p className="text-pulse-muted">Open a workspace folder</p> : null}
        {root && error ? <p className="text-red-400">{error}</p> : null}
        {branch ? (
          <p className="mb-3 text-pulse-fg">
            Branch {branch.branch} {branch.isClean ? "clean" : "dirty"}
          </p>
        ) : null}
        <ul className="space-y-1">
          {entries.map((entry) => (
            <li
              key={entry.path}
              className="rounded border border-pulse-border px-2 py-1 font-mono text-xs"
            >
              {entry.indexStatus}
              {entry.worktreeStatus} {entry.path}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
