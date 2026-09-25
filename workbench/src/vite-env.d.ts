/// <reference types="vite/client" />

declare module "*.json" {
  const value: unknown;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_PULSE_EXTENSIONS_ROOT?: string;
  readonly VITE_APP_VERSION?: string;
  readonly TAURI_PLATFORM?: string;
}


interface ImportMeta {
  readonly env: ImportMetaEnv;
}
