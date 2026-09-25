export function SettingsPanel() {
  return (
    <div className="flex h-full flex-col p-3 text-sm">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-pulse-muted">
        Settings
      </h2>
      <label className="mb-2 block">
        <span className="mb-1 block text-pulse-muted">Editor font size</span>
        <input
          type="number"
          defaultValue={14}
          className="w-full rounded border border-pulse-border bg-pulse-bg px-2 py-1"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-pulse-muted">Tab size</span>
        <input
          type="number"
          defaultValue={2}
          className="w-full rounded border border-pulse-border bg-pulse-bg px-2 py-1"
        />
      </label>
    </div>
  );
}
