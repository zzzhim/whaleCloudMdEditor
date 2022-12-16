import { useTuiEditorStore } from './tui_editor'
import keyboardjs from "keyboardjs"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { saveFile } from '@/utils/editor_command'

export const useHotKeyStore = defineStore("store/hot_key", () => {
  const tuiEditorState = useTuiEditorStore()
  const tuiEditor = computed(() => tuiEditorState.tuiEditor)

  /**
   * 
   * 保存文件
   */
  const ctrlAndS = (e: keyboardjs.KeyEvent | undefined) => {
    try {
      const content = tuiEditorState.getTuiEditorContent("markdown")

      saveFile(content ?? '')
    } catch (error) {
      console.log(error)
    }
  }

  const ctrlAndX = (e: keyboardjs.KeyEvent | undefined) => {
    console.log(e, "ctrlAndX")
  }

  /**
   *
   * alt + 1 标题 h1
   */
  const altAnd1 = (e: keyboardjs.KeyEvent | undefined) => {
    tuiEditor.value?.exec("heading", { level: 1 })
  }

  /**
   *
   * alt + 2 标题 h2
   */
  const altAnd2 = (e: keyboardjs.KeyEvent | undefined) => {
    tuiEditor.value?.exec("heading", { level: 2 })
  }

  /**
   *
   * alt + 3 标题 h3
   */
  const altAnd3 = (e: keyboardjs.KeyEvent | undefined) => {
    tuiEditor.value?.exec("heading", { level: 3 })
  }

  /**
   *
   * alt + 4 标题 h4
   */
  const altAnd4 = (e: keyboardjs.KeyEvent | undefined) => {
    tuiEditor.value?.exec("heading", { level: 4 })
  }

  /**
   *
   * alt + 5 标题 h5
   */
  const altAnd5 = (e: keyboardjs.KeyEvent | undefined) => {
    tuiEditor.value?.exec("heading", { level: 5 })
  }

  /**
   *
   * alt + 6 标题 h6
   */
  const altAnd6 = (e: keyboardjs.KeyEvent | undefined) => {
    tuiEditor.value?.exec("heading", { level: 6 })
  }

  return {
    ctrlAndS,
    ctrlAndX,
    altAnd1,
    altAnd2,
    altAnd3,
    altAnd4,
    altAnd5,
    altAnd6,
  }
})
