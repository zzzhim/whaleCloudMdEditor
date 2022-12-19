import { EditorCore } from "@toast-ui/editor"
import { defineStore } from "pinia"
import { ref } from "vue"
import prettier from "prettier"
import parserBabel from "prettier/parser-babel"
import parserMarkdown from "prettier/parser-markdown"
import parserHtml from "prettier/parser-html"

const plugins = [
  parserBabel,
  parserMarkdown,
  parserHtml,
]

export const useTuiEditorStore = defineStore('store/tui_editor', () => {
  const tuiEditor = ref<EditorCore>()

  /**
   * 
   * 获取编辑器内容
   */
  const getTuiEditorContent = (format: 'markdown' | 'html' = 'markdown') => {
    if(format === "markdown") {
      const text = tuiEditor.value?.getMarkdown()
  
      const formatText = prettier.format(text ?? '', { parser: "mdx", plugins })
  
      return formatText
    }else if(format === "html") {
      const html = tuiEditor.value?.getHTML()
  
      // const formatText = prettier.format(html ?? '', { parser: "html", plugins })
      // console.log('---------------')
      // console.log(formatText)
  
      return html
    }
  }

  return { tuiEditor, getTuiEditorContent }
})


// export const useTuiEditorStore = defineStore('store/tui_editor', {
//   state() {
//     const state = <{ tuiEditor?: EditorCore }>{}

//     return state
//   },
//   actions: {
//     setTuiEditor(editor: EditorCore) {
//       this.tuiEditor = editor
//     }
//   }
// })