export interface PulseExtensionContext {
  subscriptions: Array<() => void>;
}

export interface PulseExtensionModule {
  activate: (context: PulseExtensionContext) => void | Promise<void>;
  deactivate?: () => void | Promise<void>;
}
