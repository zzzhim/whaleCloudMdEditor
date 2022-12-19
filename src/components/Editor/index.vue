<template>
  <div class="editor">
    <!-- <div class="toolbar">
      
    </div> -->
    <div id="viewer" class="viewer" ref="viewer"></div>
  </div>
</template>

<script setup lang="ts">
// import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import '@toast-ui/chart/dist/toastui-chart.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css'

import Editor, { EditorCore } from '@toast-ui/editor'
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
// 不高亮替换
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all'

import chart from '@toast-ui/editor-plugin-chart'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
import uml from '@toast-ui/editor-plugin-uml'
import { onMounted, ref, onUnmounted, computed, nextTick, watch, toRefs } from "vue"
import Prism from 'prismjs'
import katex from "katex"
import "katex/dist/katex.min.css"

import keyboardjs from "keyboardjs"
import { useHotKeyStore } from '@/store/modules/hot_key'
import { useTuiEditorStore } from '@/store/modules/tui_editor'
import { emitter } from '@/utils/emitter'
import { useTabsStore } from '@/store/modules/tabs'
import { debounce } from 'throttle-debounce'

const viewer = ref<HTMLElement | null>(null)
const hotKey = useHotKeyStore()
const TuiEditorStore = useTuiEditorStore()
const tuiEditor = computed(() => TuiEditorStore.tuiEditor)
const tabsState = useTabsStore()
const activeTab = computed(() => tabsState.activeTab)

const patchTabs = (path: string = tabsState.activeTab) => {
  const list = tabsState.tabs.map(item => {
    if(item.path === path) {
      return {
        ...item,
        content: tuiEditor.value?.getMarkdown() ?? ''
      }
    }

    return item
  })

  tabsState.$patch(state => {
    state.tabs = list
  })
}

const contentChange = debounce(1000, patchTabs)

watch(activeTab, (newVal, oldVal) => {
  if(oldVal) {
    contentChange.cancel()

    patchTabs(oldVal)
  }

  if(newVal) {
    const find = tabsState.tabs.find(item => item.path === newVal)

    if(find) {
      emitter.emit("setMarkdown", find.content)
    }
  }else {
    emitter.emit("setMarkdown", '')
  }
})

onMounted(() => {
  const editor = Editor.factory({
    el: viewer.value!,
    // height: '100vh',
    viewer: false,
    initialEditType: 'markdown',
    initialValue: '',
    placeholder: '请输入您的内容~',
    previewHighlight: true,
    previewStyle: "vertical",
    // toolbarItems: [],
    hideModeSwitch: true,
    language:"en-US",
    useCommandShortcut: false,
    plugins: [
      [
        codeSyntaxHighlight,
        {
          highlighter: Prism
        }
      ],
      [
        chart,
        {
          width: 'auto',
          height: 'auto',
          minWidth: 0,
          maxWidth: 'Infinity',
          minHeight: 0,
          maxHeight: 'Infinity'
        }
      ],
      // colorSyntax,
      tableMergedCell,
      uml,
    ],
    customHTMLRenderer: {
      katex(node) { // 科学公式
        const html = katex.renderToString(node.literal!, {
          displayMode: true, // 禁用显示模式
          throwOnError: false,
          // output: "html",
        })

        // $$katex
        //     c = \\pm\\sqrt{a^2 + b^2}
        // $$

        console.log(html)

        return [
          { type: 'openTag', tagName: 'div', outerNewLine: true },
          { type: 'html', content: html },
          { type: 'closeTag', tagName: 'div', outerNewLine: true }
        ]
      },
    },
    events: {
      focus(editorType) {
        // 绑定键盘快捷键
        keyboardjs.bind('ctrl + s', hotKey.ctrlAndS)

        keyboardjs.bind('alt + 1', hotKey.altAnd1)
        keyboardjs.bind('alt + 2', hotKey.altAnd2)
        keyboardjs.bind('alt + 3', hotKey.altAnd3)
        keyboardjs.bind('alt + 4', hotKey.altAnd4)
        keyboardjs.bind('alt + 5', hotKey.altAnd5)
        keyboardjs.bind('alt + 6', hotKey.altAnd6)
      },
      blur(editorType) {
        // 卸载键盘快捷键
        keyboardjs.unbind('ctrl + s', hotKey.ctrlAndS)

        keyboardjs.unbind('alt + 1', hotKey.altAnd1)
        keyboardjs.unbind('alt + 2', hotKey.altAnd2)
        keyboardjs.unbind('alt + 3', hotKey.altAnd3)
        keyboardjs.unbind('alt + 4', hotKey.altAnd4)
        keyboardjs.unbind('alt + 5', hotKey.altAnd5)
        keyboardjs.unbind('alt + 6', hotKey.altAnd6)
      },
      change(editorType) {
        contentChange()
      },
    }
  }) as EditorCore

  // setTuiEditor(editor)

  TuiEditorStore.$patch((state) => {
    state.tuiEditor = editor
  })

  emitter.on("setMarkdown", (content) => {
    editor.setMarkdown(content as string)
  })
})

onUnmounted(() => {
  if(tuiEditor && tuiEditor.value) {
    tuiEditor.value?.destroy()
  }
})
</script>

<style lang="scss">
  .viewer {

    .toastui-editor-toolbar {
      // display: none;
    }

    .toastui-editor-defaultUI {
      border-width: 0px;
    }

    .toastui-editor-main {

    }
  }
</style>

<style lang="scss" scoped>
  .editor {
    width: 100%;
    height: 100%;
    // padding-top: 40px;
    position: relative;
    box-sizing: border-box;

    .toolbar {
      width: 90%;
      height: 40px;
      border-radius: 0px 0px 5px 5px;
      background-color: #FFFFFF;
      box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%), 0 2px 4px 0 rgb(232 237 250 / 50%);
      position: absolute;
      top: 0px;
      left: 5%;
      z-index: 100;
    }

    .viewer {
      width: 100%;
      height: calc(100% - 40px) !important;
    }
  }
</style>
