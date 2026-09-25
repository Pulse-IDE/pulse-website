import { useEffect } from "react";
import { WorkbenchLayout } from "@/components/layout/WorkbenchLayout";
import { UpdatePrompt } from "@/components/UpdatePrompt";
import { loadBundledExtensions } from "@/extensions/loader";
import { extensionRegistry } from "@/extensions/registry";

export default function App() {
  useEffect(() => {
    void loadBundledExtensions(extensionRegistry).catch(() => undefined);
  }, []);

  return (
    <>
      <UpdatePrompt />
      <WorkbenchLayout />
    </>
  );
}
