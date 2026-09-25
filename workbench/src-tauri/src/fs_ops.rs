use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum FsError {
    #[error("io: {0}")]
    Io(#[from] std::io::Error),
    #[error("path not found: {0}")]
    NotFound(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FileEntry {
    pub name: String,
    pub path: String,
    pub is_directory: bool,
    pub children: Option<Vec<FileEntry>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OpenFileResult {
    pub path: String,
    pub content: String,
}

pub fn read_text_file(path: &str) -> Result<OpenFileResult, FsError> {
    let p = PathBuf::from(path);
    if !p.exists() {
        return Err(FsError::NotFound(path.to_string()));
    }
    let content = fs::read_to_string(&p)?;
    Ok(OpenFileResult {
        path: path.to_string(),
        content,
    })
}

pub fn write_text_file(path: &str, content: &str) -> Result<(), FsError> {
    let p = PathBuf::from(path);
    if let Some(parent) = p.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(&p, content)?;
    Ok(())
}

fn read_dir_recursive(dir: &Path, depth: u8, max_depth: u8) -> Result<Vec<FileEntry>, FsError> {
    let mut entries: Vec<FileEntry> = Vec::new();
    let read = fs::read_dir(dir)?;
    let mut paths: Vec<PathBuf> = read.filter_map(|e| e.ok().map(|x| x.path())).collect();
    paths.sort_by_key(|p| {
        let is_dir = p.is_dir();
        (!is_dir, p.file_name().unwrap_or_default().to_ascii_lowercase())
    });
    for path in paths {
        let name = path
            .file_name()
            .map(|n| n.to_string_lossy().to_string())
            .unwrap_or_default();
        if name.starts_with('.') {
            continue;
        }
        let is_directory = path.is_dir();
        let children = if is_directory && depth < max_depth {
            Some(read_dir_recursive(&path, depth + 1, max_depth)?)
        } else {
            None
        };
        entries.push(FileEntry {
            name,
            path: path.to_string_lossy().to_string(),
            is_directory,
            children,
        });
    }
    Ok(entries)
}

pub fn list_workspace_tree(root: &str, max_depth: u8) -> Result<Vec<FileEntry>, FsError> {
    let p = PathBuf::from(root);
    if !p.is_dir() {
        return Err(FsError::NotFound(root.to_string()));
    }
    read_dir_recursive(&p, 0, max_depth)
}
