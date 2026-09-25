import type { FileEntry } from "@/types/ipc";

type DirHandle = FileSystemDirectoryHandle;

type WindowWithPicker = Window & {
  showDirectoryPicker?: (options?: {
    mode?: "read" | "readwrite";
  }) => Promise<DirHandle>;
};

let rootHandle: DirHandle | null = null;
let rootLabel: string | null = null;

export function getWebWorkspaceRoot(): string | null {
  return rootLabel;
}

export function hasDirectoryPicker(): boolean {
  const win = window as WindowWithPicker;
  return typeof window !== "undefined" && typeof win.showDirectoryPicker === "function";
}

export async function pickWebWorkspaceFolder(): Promise<string | null> {
  if (!hasDirectoryPicker()) {
    return null;
  }
  const picker = (window as WindowWithPicker).showDirectoryPicker;
  if (!picker) {
    return null;
  }
  const handle = await picker({ mode: "readwrite" });
  rootHandle = handle;
  rootLabel = handle.name;
  return rootLabel;
}

async function readFileHandle(
  handle: FileSystemFileHandle,
): Promise<string> {
  const file = await handle.getFile();
  return file.text();
}

async function walkDir(
  handle: DirHandle,
  prefix: string,
  depth: number,
  maxDepth: number,
): Promise<FileEntry[]> {
  const entries: FileEntry[] = [];
  const dirEntries = (
    handle as unknown as {
      entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
    }
  ).entries();
  for await (const [name, child] of dirEntries) {
    if (name.startsWith(".")) {
      continue;
    }
    const path = prefix ? `${prefix}/${name}` : name;
    if (child.kind === "directory") {
      const dir = child as DirHandle;
      const node: FileEntry = {
        name,
        path,
        isDirectory: true,
        children:
          depth < maxDepth
            ? await walkDir(dir, path, depth + 1, maxDepth)
            : [],
      };
      entries.push(node);
    } else {
      entries.push({
        name,
        path,
        isDirectory: false,
      });
    }
  }
  entries.sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
  return entries;
}

export async function listWebWorkspace(maxDepth: number): Promise<FileEntry[]> {
  if (!rootHandle || !rootLabel) {
    return [];
  }
  return walkDir(rootHandle, rootLabel, 0, maxDepth);
}

async function resolveFile(path: string): Promise<FileSystemFileHandle | null> {
  if (!rootHandle || !rootLabel) {
    return null;
  }
  const relative = path.startsWith(`${rootLabel}/`)
    ? path.slice(rootLabel.length + 1)
    : path === rootLabel
      ? ""
      : path;
  if (!relative) {
    return null;
  }
  const parts = relative.split("/").filter(Boolean);
  let dir: DirHandle = rootHandle;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i];
    if (!part) {
      return null;
    }
    dir = await dir.getDirectoryHandle(part);
  }
  const fileName = parts[parts.length - 1];
  if (!fileName) {
    return null;
  }
  return dir.getFileHandle(fileName);
}

export async function openWebFile(
  path: string,
): Promise<{ path: string; content: string } | null> {
  const handle = await resolveFile(path);
  if (!handle) {
    return null;
  }
  const content = await readFileHandle(handle);
  return { path, content };
}

export async function writeWebFile(
  path: string,
  content: string,
): Promise<void> {
  const handle = await resolveFile(path);
  if (!handle) {
    throw new Error("file not found in workspace");
  }
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
}
