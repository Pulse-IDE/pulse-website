export type TargetOs = "macos" | "linux" | "windows";
export type PackageKind = "dmg" | "appimage" | "deb" | "rpm" | "msi" | "exe";

export interface ReleaseAsset {
  id: string;
  os: TargetOs;
  arch: "universal" | "x86_64" | "aarch64" | "arm64";
  kind: PackageKind;
  label: string;
  hint: string;
  fileName: string;
  recommended?: boolean;
}

const RELEASE_BASE =
  "https://github.com/Pulse-IDE/pulse-core/releases/latest/download";

export function assetUrl(fileName: string): string {
  return `${RELEASE_BASE}/${fileName}`;
}

export const releaseAssets: ReleaseAsset[] = [
  {
    id: "mac-universal-dmg",
    os: "macos",
    arch: "universal",
    kind: "dmg",
    label: "macOS Universal",
    hint: "Apple Silicon and Intel in one installer",
    fileName: "Pulse_universal.dmg",
    recommended: true,
  },
  {
    id: "mac-arm-dmg",
    os: "macos",
    arch: "aarch64",
    kind: "dmg",
    label: "macOS Apple Silicon",
    hint: "Optimized for M-series Macs",
    fileName: "Pulse_aarch64.dmg",
  },
  {
    id: "mac-intel-dmg",
    os: "macos",
    arch: "x86_64",
    kind: "dmg",
    label: "macOS Intel",
    hint: "For x64 Mac hardware",
    fileName: "Pulse_x64.dmg",
  },
  {
    id: "linux-x64-appimage",
    os: "linux",
    arch: "x86_64",
    kind: "appimage",
    label: "Linux AppImage",
    hint: "Portable, works on most distributions",
    fileName: "Pulse_x86_64.AppImage",
    recommended: true,
  },
  {
    id: "linux-x64-deb",
    os: "linux",
    arch: "x86_64",
    kind: "deb",
    label: "Linux Debian / Ubuntu",
    hint: "Native .deb package",
    fileName: "Pulse_amd64.deb",
  },
  {
    id: "linux-x64-rpm",
    os: "linux",
    arch: "x86_64",
    kind: "rpm",
    label: "Linux Fedora / RHEL",
    hint: "Native .rpm package",
    fileName: "Pulse_x86_64.rpm",
  },
  {
    id: "linux-arm-appimage",
    os: "linux",
    arch: "aarch64",
    kind: "appimage",
    label: "Linux ARM64 AppImage",
    hint: "Portable build for ARM64 Linux",
    fileName: "Pulse_aarch64.AppImage",
  },
  {
    id: "linux-arm-deb",
    os: "linux",
    arch: "aarch64",
    kind: "deb",
    label: "Linux ARM64 Debian",
    hint: "Debian package for ARM64",
    fileName: "Pulse_arm64.deb",
  },
  {
    id: "win-x64-msi",
    os: "windows",
    arch: "x86_64",
    kind: "msi",
    label: "Windows x64 MSI",
    hint: "Enterprise-friendly installer",
    fileName: "Pulse_x64_en-US.msi",
    recommended: true,
  },
  {
    id: "win-x64-exe",
    os: "windows",
    arch: "x86_64",
    kind: "exe",
    label: "Windows x64 EXE",
    hint: "Standard setup executable",
    fileName: "Pulse_x64-setup.exe",
  },
  {
    id: "win-arm64-msi",
    os: "windows",
    arch: "arm64",
    kind: "msi",
    label: "Windows ARM64 MSI",
    hint: "For Snapdragon and ARM64 PCs",
    fileName: "Pulse_arm64_en-US.msi",
  },
  {
    id: "win-arm64-exe",
    os: "windows",
    arch: "arm64",
    kind: "exe",
    label: "Windows ARM64 EXE",
    hint: "Setup executable for ARM64",
    fileName: "Pulse_arm64-setup.exe",
  },
];

export const platformSections: Array<{
  os: TargetOs;
  title: string;
  description: string;
}> = [
  {
    os: "macos",
    title: "macOS",
    description: "Universal, Apple Silicon, and Intel builds",
  },
  {
    os: "linux",
    title: "Linux",
    description: "AppImage, Debian, RPM, and ARM64 packages",
  },
  {
    os: "windows",
    title: "Windows",
    description: "MSI and EXE for x64 and ARM64",
  },
];
