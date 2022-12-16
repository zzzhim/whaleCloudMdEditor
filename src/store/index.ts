import { defineStore } from "pinia"
import { ref } from "vue"

export const useGlobalStore = defineStore('store/global_state', () => {
  const globalState = ref({})

  return { globalState }
})