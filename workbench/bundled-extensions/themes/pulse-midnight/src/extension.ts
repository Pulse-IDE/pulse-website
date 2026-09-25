import type { PulseExtensionContext } from "../../../sdk/types";

const themeVariables: Record<string, string> = {
  "--pulse-bg": "#05070b",
  "--pulse-surface": "#0c1018",
  "--pulse-fg": "#eef2f8",
  "--pulse-accent": "#3b82f6",
  "--pulse-border": "#243044",
  "--pulse-muted": "#94a3b8",
  "--pulse-sidebar": "#070a10",
};

function applyTheme(): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(themeVariables)) {
    root.style.setProperty(key, value);
  }
}

export function activate(_context: PulseExtensionContext): void {
  applyTheme();
}

export function deactivate(): void {
  const root = document.documentElement;
  for (const key of Object.keys(themeVariables)) {
    root.style.removeProperty(key);
  }
}
