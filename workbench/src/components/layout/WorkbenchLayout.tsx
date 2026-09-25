import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { ActivityBar } from "@/components/sidebar/ActivityBar";
import { SidebarHost } from "@/components/sidebar/SidebarHost";
import { EditorArea } from "@/components/editor/EditorArea";
import { TerminalPane } from "@/components/terminal/TerminalPane";
import { StatusBar } from "@/components/layout/StatusBar";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";

export function WorkbenchLayout() {
  const terminalVisible = useWorkbenchStore((s) => s.terminalVisible);

  return (
    <div className="flex h-full flex-col bg-pulse-bg text-pulse-fg">
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <PanelGroup direction="horizontal" className="min-w-0 flex-1">
          <Panel defaultSize={18} minSize={12} maxSize={35}>
            <SidebarHost />
          </Panel>
          <PanelResizeHandle className="w-px bg-pulse-border" />
          <Panel defaultSize={82} minSize={40}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={terminalVisible ? 72 : 100} minSize={30}>
                <EditorArea />
              </Panel>
              {terminalVisible ? (
                <>
                  <PanelResizeHandle className="h-px bg-pulse-border" />
                  <Panel defaultSize={28} minSize={15}>
                    <TerminalPane />
                  </Panel>
                </>
              ) : null}
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
      <StatusBar />
    </div>
  );
}
