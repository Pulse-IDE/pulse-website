import { FileExplorer } from "@/components/sidebar/FileExplorer";
import { ExtensionsPanel } from "@/components/sidebar/ExtensionsPanel";
import { SettingsPanel } from "@/components/sidebar/SettingsPanel";
import { ScmPanel } from "@/components/sidebar/ScmPanel";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";

export function SidebarHost() {
  const panel = useWorkbenchStore((s) => s.sidebarPanel);

  return (
    <aside className="flex h-full flex-col border-r border-pulse-border bg-pulse-surface">
      {panel === "explorer" ? <FileExplorer /> : null}
      {panel === "extensions" ? <ExtensionsPanel /> : null}
      {panel === "settings" ? <SettingsPanel /> : null}
      {panel === "scm" ? <ScmPanel /> : null}
    </aside>
  );
}
