import { markdownSuffix, imageSuffix } from '@/config/index'
import { FileEntry } from "@tauri-apps/api/fs"

export const filterSidebarFile = (fileList: FileEntry[]) => {
  const list = fileList.filter(item => {
    if(Array.isArray(item.children)) {
      return true
    }

    const arr = item.name?.split('.') ?? []
    const suffix = arr[arr?.length - 1].toLocaleLowerCase()

    return markdownSuffix.includes(suffix) || imageSuffix.includes(suffix)
  })

  return list
}