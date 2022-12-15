<template>
  <div class="editor">
    <div class="toolbar" @click="() => handleGetMarkdown()">
      
    </div>
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

import Editor, { EditorCore, Viewer } from '@toast-ui/editor'
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
// 不高亮替换
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all'

import chart from '@toast-ui/editor-plugin-chart'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
import uml from '@toast-ui/editor-plugin-uml'
import { onMounted, defineComponent, ref, onUnmounted, computed } from "vue"
import Prism from 'prismjs'
import katex from "katex"
import "katex/dist/katex.min.css"

import prettier from "prettier"
import parserBabel from "prettier/parser-babel"
import parserMarkdown from "prettier/parser-markdown"
import parserHtml from "prettier/parser-html"

const plugins = [
  parserBabel,
  parserMarkdown,
  parserHtml,
]

const viewer = ref<HTMLElement | null>(null)
const editor = ref<EditorCore>()

/**
 * 
 * 获取编辑器内容
 */
const handleGetMarkdown = (format: 'markdown' | 'html' = 'markdown') => {
  if(format === "markdown") {
    const text = editor.value?.getMarkdown()

    const formatText = prettier.format(text ?? '', { parser: "mdx", plugins })

    return formatText
  }else if(format === "html") {
    const html = editor.value?.getHTML()

    const formatText = prettier.format(html ?? '', { parser: "html", plugins })
    console.log('---------------')
    console.log(formatText)

    return html
  }

  
}

onMounted(() => {
  editor.value = Editor.factory({
    el: viewer.value!,
    height: '100vh',
    viewer: false,
    initialEditType: 'markdown',
    initialValue: '',
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
      katex(node) {
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
    }
  }) as EditorCore
  
  // const target = editor.value

  // 执行命令 2级标题
  // target!.exec("heading", { level: 2 })
})

onUnmounted(() => {
  if(editor && editor.value) {
    editor.value.destroy()
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
    padding-top: 40px;
    position: relative;

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
      // height: 100vh;


      & .toastui-editor-toolbar {
        display: none;
      }
    }
  }
</style>
