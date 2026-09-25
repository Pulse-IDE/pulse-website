import ExtensionHostWorker from "@/extensions/extensionHost.worker?worker";
import type {
  PulseExtensionContext,
  PulseExtensionModule,
  PulsePluginManifest,
} from "@/extensions/types";

export interface LoadedExtension {
  manifest: PulsePluginManifest;
  module: PulseExtensionModule;
  dispose: () => Promise<void>;
}

const sandboxRegistry = new Map<string, LoadedExtension>();

interface WorkerActivateResult {
  ok: boolean;
  error?: string;
}

function loadInMainThread(
  entryUrl: string,
): Promise<PulseExtensionModule> {
  return import(/* @vite-ignore */ entryUrl) as Promise<PulseExtensionModule>;
}

async function loadInWorkerSandbox(entryUrl: string): Promise<PulseExtensionModule> {
  const worker = new ExtensionHostWorker();
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      worker.terminate();
      reject(new Error("extension worker timeout"));
    }, 15000);
    worker.onmessage = (event: MessageEvent<WorkerActivateResult>) => {
      window.clearTimeout(timeout);
      worker.terminate();
      if (!event.data.ok) {
        reject(new Error(event.data.error ?? "extension worker failed"));
        return;
      }
      resolve({
        activate: async (context: PulseExtensionContext) => {
          const mod = await loadInMainThread(entryUrl);
          await mod.activate(context);
        },
        deactivate: async () => {
          const mod = await loadInMainThread(entryUrl);
          if (mod.deactivate) {
            await mod.deactivate();
          }
        },
      });
    };
    worker.onerror = () => {
      window.clearTimeout(timeout);
      worker.terminate();
      reject(new Error("extension worker crashed"));
    };
    worker.postMessage({ entryUrl });
  });
}

export async function loadExtensionFromUrl(
  manifest: PulsePluginManifest,
  entryUrl: string,
): Promise<LoadedExtension> {
  const imported =
    manifest.id.startsWith("pulse-theme")
      ? await loadInMainThread(entryUrl)
      : await loadInWorkerSandbox(entryUrl);
  const context: PulseExtensionContext = { subscriptions: [] };
  await imported.activate(context);
  const dispose = async () => {
    for (const sub of context.subscriptions) {
      sub();
    }
    if (imported.deactivate) {
      await imported.deactivate();
    }
  };
  const loaded: LoadedExtension = {
    manifest,
    module: imported,
    dispose,
  };
  sandboxRegistry.set(manifest.id, loaded);
  return loaded;
}

export function getLoadedExtensions(): LoadedExtension[] {
  return Array.from(sandboxRegistry.values());
}

export async function unloadExtension(id: string): Promise<void> {
  const ext = sandboxRegistry.get(id);
  if (!ext) {
    return;
  }
  await ext.dispose();
  sandboxRegistry.delete(id);
}

export async function loadBundledExtensions(
  manifests: Array<{ manifest: PulsePluginManifest; entryUrl: string }>,
): Promise<LoadedExtension[]> {
  const loaded: LoadedExtension[] = [];
  for (const item of manifests) {
    loaded.push(await loadExtensionFromUrl(item.manifest, item.entryUrl));
  }
  return loaded;
}
