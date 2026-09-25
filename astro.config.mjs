import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://pulse-ide.dev",
  output: "static",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "it", "es", "fr", "de", "pt", "ja", "zh", "ko", "ru"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(root, "workbench/src"),
        "@site": path.resolve(root, "src"),
        "@tauri-apps/plugin-dialog": path.resolve(
          root,
          "src/stubs/tauri-plugin-dialog.ts",
        ),
        "@tauri-apps/api/core": path.resolve(root, "src/stubs/tauri-api-core.ts"),
        "@tauri-apps/api/event": path.resolve(root, "src/stubs/tauri-api-event.ts"),
      },
    },
    worker: {
      format: "es",
    },
    optimizeDeps: {
      exclude: ["@tauri-apps/api", "@tauri-apps/plugin-dialog"],
    },
  },
});
