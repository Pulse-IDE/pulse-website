import { extensionRegistry } from "@/extensions/registry";
import { getLoadedExtensions } from "@/extensions/loader";

export function ExtensionsPanel() {
  const loaded = getLoadedExtensions();

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-pulse-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-pulse-muted">
        Extensions
      </header>
      <ul className="flex-1 overflow-auto p-2 text-sm">
        {extensionRegistry.map((entry) => {
          const isActive = loaded.some((l) => l.manifest.id === entry.manifest.id);
          return (
            <li
              key={entry.manifest.id}
              className="mb-2 rounded border border-pulse-border p-2"
            >
              <div className="font-medium">{entry.manifest.name}</div>
              <div className="text-xs text-pulse-muted">
                {entry.manifest.publisher} v{entry.manifest.version}
              </div>
              <div className="mt-1 text-xs">{entry.manifest.description}</div>
              <div className="mt-2 text-xs text-pulse-accent">
                {isActive ? "Active" : "Inactive"}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
