import { useEffect } from "react";
import { WorkbenchLayout } from "@/components/layout/WorkbenchLayout";
import { monacoWorker } from "@/components/editor/monacoWorker";
import { loadBundledExtensions } from "@/extensions/loader";
import { extensionRegistry } from "@/extensions/registry";
import "@/styles/globals.css";

monacoWorker();

export default function PulseWebApp() {
  useEffect(() => {
    void loadBundledExtensions(extensionRegistry).catch(() => undefined);
  }, []);

  return (
    <div className="pulse-web-root h-full min-h-0">
      <WorkbenchLayout />
    </div>
  );
}
