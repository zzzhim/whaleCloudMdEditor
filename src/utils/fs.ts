import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs'

export const getMdFileContent = async (path: string) => {
  try {
    const content = await readTextFile(path)
    
    return content
  } catch (error) {
    console.log(error)
  }
}
