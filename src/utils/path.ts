import { dirname } from "@tauri-apps/api/path"

/**
 * 
 * 获取文件列表
 */
export const getFileList = async (path: string) => {
  try {
    const fileList = await window.__TAURI__?.fs?.readDir(path)

    return fileList
  } catch (error) {
    console.log(error)
  }
}

export const getDirName = async (path: string) => {
  try {
    const dir = await dirname(path)

    return dir
  } catch (error) {
    console.log(error)
  }
}