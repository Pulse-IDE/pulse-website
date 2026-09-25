import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(root, "../pulse-core");
const target = path.resolve(root, "workbench");

const SKIP = new Set(["node_modules", "dist", ".git"]);
const SKIP_PATHS = ["src-tauri/target"];

function shouldSkip(relPath) {
  const parts = relPath.split(path.sep);
  if (parts.some((part) => SKIP.has(part))) {
    return true;
  }
  return SKIP_PATHS.some((skip) => relPath.startsWith(skip));
}

function copyTree(from, to, rel = "") {
  if (shouldSkip(rel)) {
    return;
  }
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    const nextRel = rel ? `${rel}${path.sep}${entry}` : entry;
    if (shouldSkip(nextRel)) {
      continue;
    }
    const srcPath = path.join(from, entry);
    const dstPath = path.join(to, entry);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      copyTree(srcPath, dstPath, nextRel);
    } else {
      cpSync(srcPath, dstPath);
    }
  }
}

if (!existsSync(source)) {
  if (existsSync(path.join(target, "package.json"))) {
    process.exit(0);
  }
  console.error("pulse-core source not found and workbench/ is missing");
  process.exit(1);
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}
copyTree(source, target);
