<template>
  <div id="viewer" class="viewer" ref="viewer"></div>
</template>

<script setup lang="ts">
// import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import Editor from '@toast-ui/editor'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import { onMounted, defineComponent, ref } from "vue"
import Prism from 'prismjs'

const viewer = ref<HTMLElement | null>(null)

onMounted(() => {
  const editor = Editor.factory({
    el: viewer.value!,
    height: '100vh',
    viewer: false,
    initialEditType: 'markdown',
    initialValue: '# hello',
    previewHighlight: true,
    previewStyle: "vertical",
    toolbarItems: [],
    hideModeSwitch: true,
    plugins: [
      [
        codeSyntaxHighlight,
        {
          highlighter: Prism
        }
      ]
    ]
  })

  console.log(editor)
})

</script>

<style lang="scss" scoped>
  .viewer {
    width: 100%;
    // height: 100vh;
  }
</style>
