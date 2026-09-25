import type { Monaco } from "@monaco-editor/react";

let registered = false;

export function registerPulseTheme(monaco: Monaco): void {
  // Monaco from @monaco-editor/react
  if (registered) {
    return;
  }
  registered = true;
  monaco.editor.defineTheme("pulse-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "64748b", fontStyle: "italic" },
      { token: "keyword", foreground: "c792ea" },
      { token: "string", foreground: "a5e07d" },
      { token: "number", foreground: "f78c6c" },
      { token: "type", foreground: "82aaff" },
    ],
    colors: {
      "editor.background": "#05070b",
      "editor.foreground": "#e2e8f0",
      "editorLineNumber.foreground": "#475569",
      "editorLineNumber.activeForeground": "#94a3b8",
      "editor.selectionBackground": "#3b82f640",
      "editor.inactiveSelectionBackground": "#3b82f625",
      "editorCursor.foreground": "#5b9dff",
      "editor.lineHighlightBackground": "#0f172a",
      "editorIndentGuide.background": "#1e293b",
      "editorIndentGuide.activeBackground": "#334155",
    },
  });
}
