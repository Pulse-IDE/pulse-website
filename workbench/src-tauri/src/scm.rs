use serde::{Deserialize, Serialize};
use std::path::Path;
use std::process::Command;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GitStatusEntry {
    pub path: String,
    pub index_status: String,
    pub worktree_status: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GitBranchInfo {
    pub branch: String,
    pub is_clean: bool,
}

pub fn git_branch(root: &str) -> Result<GitBranchInfo, String> {
    if !Path::new(root).join(".git").exists() {
        return Err("not a git repository".to_string());
    }
    let branch_output = Command::new("git")
        .args(["-C", root, "rev-parse", "--abbrev-ref", "HEAD"])
        .output()
        .map_err(|e| e.to_string())?;
    if !branch_output.status.success() {
        return Err(String::from_utf8_lossy(&branch_output.stderr).to_string());
    }
    let branch = String::from_utf8_lossy(&branch_output.stdout)
        .trim()
        .to_string();
    let status_output = Command::new("git")
        .args(["-C", root, "status", "--porcelain"])
        .output()
        .map_err(|e| e.to_string())?;
    if !status_output.status.success() {
        return Err(String::from_utf8_lossy(&status_output.stderr).to_string());
    }
    let is_clean = status_output.stdout.is_empty();
    Ok(GitBranchInfo { branch, is_clean })
}

pub fn git_status(root: &str) -> Result<Vec<GitStatusEntry>, String> {
    if !Path::new(root).join(".git").exists() {
        return Err("not a git repository".to_string());
    }
    let output = Command::new("git")
        .args(["-C", root, "status", "--porcelain"])
        .output()
        .map_err(|e| e.to_string())?;
    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }
    let text = String::from_utf8_lossy(&output.stdout);
    let mut entries = Vec::new();
    for line in text.lines() {
        if line.len() < 4 {
            continue;
        }
        let index_status = line.chars().next().unwrap_or(' ').to_string();
        let worktree_status = line.chars().nth(1).unwrap_or(' ').to_string();
        let path = line[3..].trim().to_string();
        if path.is_empty() {
            continue;
        }
        entries.push(GitStatusEntry {
            path,
            index_status,
            worktree_status,
        });
    }
    Ok(entries)
}
