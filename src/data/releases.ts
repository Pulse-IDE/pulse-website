export type TargetOs = "macos" | "linux" | "windows" | "unknown";

export interface ReleaseAsset {
  os: TargetOs;
  arch: string;
  label: string;
  url: string;
}

export const releaseAssets: ReleaseAsset[] = [
  {
    os: "macos",
    arch: "universal",
    label: "macOS Universal (.dmg)",
    url: "https://github.com/Pulse-IDE/pulse-core/releases/latest/download/Pulse_universal.dmg",
  },
  {
    os: "linux",
    arch: "x86_64",
    label: "Linux AppImage",
    url: "https://github.com/Pulse-IDE/pulse-core/releases/latest/download/Pulse_x86_64.AppImage",
  },
  {
    os: "linux",
    arch: "x86_64",
    label: "Linux Debian (.deb)",
    url: "https://github.com/Pulse-IDE/pulse-core/releases/latest/download/Pulse_amd64.deb",
  },
  {
    os: "linux",
    arch: "x86_64",
    label: "Linux RPM",
    url: "https://github.com/Pulse-IDE/pulse-core/releases/latest/download/Pulse_x86_64.rpm",
  },
  {
    os: "windows",
    arch: "x86_64",
    label: "Windows Installer (.msi)",
    url: "https://github.com/Pulse-IDE/pulse-core/releases/latest/download/Pulse_x64_en-US.msi",
  },
  {
    os: "windows",
    arch: "x86_64",
    label: "Windows Setup (.exe)",
    url: "https://github.com/Pulse-IDE/pulse-core/releases/latest/download/Pulse_x64-setup.exe",
  },
  {
    os: "windows",
    arch: "arm64",
    label: "Windows ARM64 (.msi)",
    url: "https://github.com/Pulse-IDE/pulse-core/releases/latest/download/Pulse_arm64_en-US.msi",
  },
];
