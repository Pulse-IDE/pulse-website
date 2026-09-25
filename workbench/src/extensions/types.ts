export interface PulsePluginManifest {
  id: string;
  name: string;
  version: string;
  publisher: string;
  description: string;
  engine: string;
  entry: string;
  contributes?: PulseContributions;
}

export interface PulseContributions {
  themes?: PulseThemeContribution[];
  commands?: PulseCommandContribution[];
}

export interface PulseThemeContribution {
  id: string;
  label: string;
  ui: Record<string, string>;
}

export interface PulseCommandContribution {
  id: string;
  title: string;
}

export interface PulseExtensionContext {
  subscriptions: Array<() => void>;
}

export interface PulseExtensionModule {
  activate: (context: PulseExtensionContext) => void | Promise<void>;
  deactivate?: () => void | Promise<void>;
}
