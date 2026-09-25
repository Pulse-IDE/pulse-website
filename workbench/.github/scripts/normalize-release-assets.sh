#!/usr/bin/env bash
set -euo pipefail

INPUT_DIR="${1:-artifacts}"
OUTPUT_DIR="${2:-release-assets}"

mkdir -p "$OUTPUT_DIR"

while IFS= read -r -d '' file; do
  base="$(basename "$file")"
  lower="$(echo "$base" | tr '[:upper:]' '[:lower:]')"
  target=""

  if [[ "$lower" == *universal*.dmg ]]; then
    target="Pulse_universal.dmg"
  elif [[ "$lower" == *aarch64*.dmg ]]; then
    target="Pulse_aarch64.dmg"
  elif [[ "$lower" == *x64*.dmg || "$lower" == *x86_64*.dmg ]]; then
    target="Pulse_x64.dmg"
  elif [[ "$lower" == *aarch64*.appimage ]]; then
    target="Pulse_aarch64.AppImage"
  elif [[ "$lower" == *.appimage ]]; then
    target="Pulse_x86_64.AppImage"
  elif [[ "$lower" == *arm64*.deb ]]; then
    target="Pulse_arm64.deb"
  elif [[ "$lower" == *.deb ]]; then
    target="Pulse_amd64.deb"
  elif [[ "$lower" == *.rpm ]]; then
    target="Pulse_x86_64.rpm"
  elif [[ "$lower" == *arm64*setup.exe ]]; then
    target="Pulse_arm64-setup.exe"
  elif [[ "$lower" == *setup.exe ]]; then
    target="Pulse_x64-setup.exe"
  elif [[ "$lower" == *arm64*.msi ]]; then
    target="Pulse_arm64_en-US.msi"
  elif [[ "$lower" == *.msi ]]; then
    target="Pulse_x64_en-US.msi"
  fi

  if [[ -n "$target" ]]; then
    cp "$file" "$OUTPUT_DIR/$target"
  fi
done < <(find "$INPUT_DIR" -type f \( \
  -iname '*.dmg' -o \
  -iname '*.appimage' -o \
  -iname '*.deb' -o \
  -iname '*.rpm' -o \
  -iname '*.msi' -o \
  -iname '*setup.exe' \
  \) -print0)

ls -la "$OUTPUT_DIR"
