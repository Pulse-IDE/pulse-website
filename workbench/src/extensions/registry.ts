import type { PulsePluginManifest } from "@/extensions/types";
import midnightManifest from "../../bundled-extensions/themes/pulse-midnight/pulse.plugin.json";
import formatterManifest from "../../bundled-extensions/formatters/pulse-prettier-lite/pulse.plugin.json";

export interface RegistryEntry {
  manifest: PulsePluginManifest;
  entryUrl: string;
}

export const extensionRegistry: RegistryEntry[] = [
  {
    manifest: midnightManifest as PulsePluginManifest,
    entryUrl: new URL(
      "../../bundled-extensions/themes/pulse-midnight/src/extension.ts",
      import.meta.url,
    ).href,
  },
  {
    manifest: formatterManifest as PulsePluginManifest,
    entryUrl: new URL(
      "../../bundled-extensions/formatters/pulse-prettier-lite/src/extension.ts",
      import.meta.url,
    ).href,
  },
];
