import type * as dialog from '@tauri-apps/api/dialog'
import type * as fs from '@tauri-apps/api/fs'
import type * as path from '@tauri-apps/api/path'

declare global {
  interface Window {
    __TAURI__: {
      fs?: typeof fs
      path?: typeof path
      dialog?: typeof dialog
    }
  }
}