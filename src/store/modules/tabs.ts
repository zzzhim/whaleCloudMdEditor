import { FileEntry } from '@tauri-apps/api/fs'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface FileInfo extends FileEntry {
  title: string
  content: string
}

export const useTabsStore = defineStore("store/tabs", () => {
  const tabs = ref<FileInfo[]>([])
  const activeTab = ref<string>('')

  return { tabs, activeTab }
})