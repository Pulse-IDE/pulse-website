import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { useWorkbenchStore } from "@/store/useWorkbenchStore";
import { monacoWorker } from "@/components/editor/monacoWorker";
import { registerPulseTheme } from "@/components/editor/monacoTheme";

monacoWorker();

interface MonacoEditorViewProps {
  tabId: string;
  path: string;
  value: string;
}

function languageFromPath(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    md: "markdown",
    rs: "rust",
    py: "python",
    go: "go",
    html: "html",
    css: "css",
  };
  return map[ext] ?? "plaintext";
}

export function MonacoEditorView({ tabId, path, value }: MonacoEditorViewProps) {
  const updateTabContent = useWorkbenchStore((s) => s.updateTabContent);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const language = languageFromPath(path);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    host.dataset.pulseActiveEditor = "true";
    host.dataset.language = language;
    host.dataset.source = value;
    host.dataset.tabId = tabId;
    const onFormat = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      updateTabContent(tabId, detail);
    };
    host.addEventListener("pulse:format-applied", onFormat);
    return () => {
      host.removeEventListener("pulse:format-applied", onFormat);
      delete host.dataset.pulseActiveEditor;
    };
  }, [language, tabId, updateTabContent, value]);

  useEffect(() => {
    const host = hostRef.current;
    if (host) {
      host.dataset.source = value;
    }
  }, [value]);

  return (
    <div ref={hostRef} className="h-full w-full">
      <Editor
        height="100%"
        language={language}
        value={value}
        theme="pulse-dark"
        beforeMount={registerPulseTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          lineHeight: 22,
          padding: { top: 12 },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          renderLineHighlight: "line",
          bracketPairColorization: { enabled: true },
        }}
        onChange={(next) => updateTabContent(tabId, next ?? "")}
      />
    </div>
  );
}
