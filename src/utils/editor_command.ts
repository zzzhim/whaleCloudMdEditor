import { desktopDir, resolve } from '@tauri-apps/api/path'
import { save } from '@tauri-apps/api/dialog'
import { writeTextFile } from '@tauri-apps/api/fs'

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

export const writeFile = async (path: string, content: string) => {
  try {
    await writeTextFile(path, content)
  } catch (error) {
    console.log(error)
  }
}