import { desktopDir, resolve } from '@tauri-apps/api/path'
import { save } from '@tauri-apps/api/dialog'

export const saveFile = async (data: string, fileName: string = 'Untitled-1.md') => {
  const desktopPath = await desktopDir()
  const untitledMdPath = await resolve(desktopPath, fileName)

  const filePath = await save({
    defaultPath: untitledMdPath,
    filters: [
      {
        name: 'Untitled-1',
        extensions: [ 'md' ]
      }
    ]
  })

  if(filePath) {
    window.__TAURI__?.fs?.writeTextFile(filePath, data)
  }
}
