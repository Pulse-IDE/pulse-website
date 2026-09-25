import type { PulseExtensionContext } from "../../../sdk/types";

function formatJson(input: string): string {
  const parsed = JSON.parse(input) as unknown;
  return `${JSON.stringify(parsed, null, 2)}\n`;
}

function formatTypescriptLite(input: string): string {
  return input
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\{\s*\n/g, "{\n")
    .concat(input.endsWith("\n") ? "" : "\n");
}

function formatActiveEditor(): void {
  const selection = window.getSelection();
  if (!selection) {
    return;
  }
  const active = document.querySelector<HTMLElement>("[data-pulse-active-editor]");
  if (!active) {
    return;
  }
  const language = active.dataset.language ?? "plaintext";
  const source = active.dataset.source ?? "";
  const formatted =
    language === "json" ? formatJson(source) : formatTypescriptLite(source);
  active.dataset.source = formatted;
  active.dispatchEvent(new CustomEvent("pulse:format-applied", { detail: formatted }));
}

export function activate(context: PulseExtensionContext): void {
  const handler = () => formatActiveEditor();
  window.addEventListener("pulse:format-document", handler);
  context.subscriptions.push(() => {
    window.removeEventListener("pulse:format-document", handler);
  });
}

export function deactivate(): void {}
