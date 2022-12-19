#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri_plugin_store::PluginBuilder;
use tauri_plugin_fs_watch::Watcher;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .plugin(PluginBuilder::default().build())
        .plugin(Watcher::default())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
