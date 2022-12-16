import { desktopDir, resolve } from '@tauri-apps/api/path'
import { open } from '@tauri-apps/api/dialog'

export const openFolder = async () => {
  const desktopPath = await desktopDir()

  const dirPath = await open({
    defaultPath: desktopPath,
    directory: true,
  })

  return dirPath
}