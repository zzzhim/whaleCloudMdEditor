import { FileEntry } from "@tauri-apps/api/fs"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useSidebarStore = defineStore("store/sidebar", () => {
  const fileDir = ref<FileEntry>()
  const fileList = ref<FileEntry[]>([])
  const showMenu = ref<boolean>(false)

  return { fileDir, fileList, showMenu }
})
