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
import { TitleBar } from "@/components/layout/TitleBar";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";

function ResizeHandle({ direction }: { direction: "horizontal" | "vertical" }) {
  return (
    <PanelResizeHandle
      className={
        direction === "horizontal"
          ? "group relative w-px bg-pulse-border"
          : "group relative h-px bg-pulse-border"
      }
    >
      <div
        className={
          direction === "horizontal"
            ? "absolute inset-y-0 -left-0.5 w-1 group-hover:bg-pulse-accent/40"
            : "absolute inset-x-0 -top-0.5 h-1 group-hover:bg-pulse-accent/40"
        }
      />
    </PanelResizeHandle>
  );
}

export function WorkbenchLayout() {
  const terminalVisible = useWorkbenchStore((s) => s.terminalVisible);

  return (
    <div className="flex h-full flex-col bg-pulse-bg text-pulse-fg">
      <TitleBar />
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <PanelGroup direction="horizontal" className="min-w-0 flex-1">
          <Panel defaultSize={22} minSize={14} maxSize={38}>
            <SidebarHost />
          </Panel>
          <ResizeHandle direction="horizontal" />
          <Panel defaultSize={78} minSize={40}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={terminalVisible ? 70 : 100} minSize={28}>
                <EditorArea />
              </Panel>
              {terminalVisible ? (
                <>
                  <ResizeHandle direction="vertical" />
                  <Panel defaultSize={30} minSize={16}>
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
