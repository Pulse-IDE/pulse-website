use serde::Serialize;
use tauri::AppHandle;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateCheckResult {
    pub current: String,
    pub latest: Option<String>,
    pub download_url: Option<String>,
}

#[derive(serde::Deserialize)]
struct GhRelease {
    tag_name: String,
    assets: Vec<GhAsset>,
}

#[derive(serde::Deserialize)]
struct GhAsset {
    name: String,
    browser_download_url: String,
}

fn platform_asset_hint() -> &'static str {
    if cfg!(target_os = "macos") {
        if cfg!(target_arch = "aarch64") {
            "aarch64.dmg"
        } else {
            "universal.dmg"
        }
    } else if cfg!(target_os = "windows") {
        if cfg!(target_arch = "aarch64") {
            "arm64-setup.exe"
        } else {
            "x64-setup.exe"
        }
    } else if cfg!(target_arch = "aarch64") {
        "aarch64.AppImage"
    } else {
        "x86_64.AppImage"
    }
}

pub fn check_for_updates(current: &str) -> Result<UpdateCheckResult, String> {
    let response = ureq::get("https://api.github.com/repos/Pulse-IDE/pulse-core/releases/latest")
        .set("User-Agent", "Pulse-IDE")
        .set("Accept", "application/vnd.github+json")
        .call()
        .map_err(|e| e.to_string())?;
    let release: GhRelease = response.into_json().map_err(|e| e.to_string())?;
    let hint = platform_asset_hint();
    let download_url = release
        .assets
        .iter()
        .find(|asset| asset.name.to_ascii_lowercase().contains(hint))
        .map(|asset| asset.browser_download_url.clone())
        .or_else(|| {
            release
                .assets
                .first()
                .map(|asset| asset.browser_download_url.clone())
        });
    Ok(UpdateCheckResult {
        current: current.to_string(),
        latest: Some(release.tag_name.trim_start_matches('v').to_string()),
        download_url,
    })
}

pub fn apply_update(app: &AppHandle, download_url: &str) -> Result<(), String> {
    use tauri_plugin_opener::OpenerExt;
    app.opener()
        .open_url(download_url, None::<&str>)
        .map_err(|e| e.to_string())
}
