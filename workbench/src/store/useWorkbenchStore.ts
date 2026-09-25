import { create } from "zustand";
import type { FileEntry } from "@/types/ipc";

export type SidebarPanel = "explorer" | "extensions" | "settings" | "scm";

export interface EditorTab {
  id: string;
  path: string;
  label: string;
  content: string;
  dirty: boolean;
}

interface WorkbenchState {
  workspaceRoot: string | null;
  tree: FileEntry[];
  sidebarPanel: SidebarPanel;
  tabs: EditorTab[];
  activeTabId: string | null;
  terminalVisible: boolean;
  setWorkspaceRoot: (root: string | null) => void;
  setTree: (tree: FileEntry[]) => void;
  setSidebarPanel: (panel: SidebarPanel) => void;
  openTab: (tab: EditorTab) => void;
  updateTabContent: (id: string, content: string) => void;
  markTabSaved: (id: string) => void;
  setActiveTab: (id: string | null) => void;
  closeTab: (id: string) => void;
  setTerminalVisible: (visible: boolean) => void;
}

export const useWorkbenchStore = create<WorkbenchState>((set, get) => ({
  workspaceRoot: null,
  tree: [],
  sidebarPanel: "explorer",
  tabs: [],
  activeTabId: null,
  terminalVisible: true,
  setWorkspaceRoot: (root) => set({ workspaceRoot: root }),
  setTree: (tree) => set({ tree }),
  setSidebarPanel: (panel) => set({ sidebarPanel: panel }),
  openTab: (tab) => {
    const existing = get().tabs.find((t) => t.path === tab.path);
    if (existing) {
      set({ activeTabId: existing.id });
      return;
    }
    set((state) => ({
      tabs: [...state.tabs, tab],
      activeTabId: tab.id,
    }));
  },
  updateTabContent: (id, content) =>
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === id ? { ...t, content, dirty: true } : t,
      ),
    })),
  markTabSaved: (id) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, dirty: false } : t)),
    })),
  setActiveTab: (id) => set({ activeTabId: id }),
  closeTab: (id) =>
    set((state) => {
      const next = state.tabs.filter((t) => t.id !== id);
      let active = state.activeTabId;
      if (active === id) {
        active = next.length > 0 ? next[next.length - 1]?.id ?? null : null;
      }
      return { tabs: next, activeTabId: active };
    }),
  setTerminalVisible: (visible) => set({ terminalVisible: visible }),
}));
