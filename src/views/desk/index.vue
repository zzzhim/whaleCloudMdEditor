<template>
  <div class="page">
    <div class="editor">
      <Editor />
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from "vue"
// export { default as Editor } from "@/components/Editor/index.vue"
import Editor from "@/components/Editor/index.vue"


// defineComponent({
//   Editor
// })

onMounted(() => {
})


</script>

<style lang="scss" scoped>
  .page {
    width: 100%;

    .editor {
      width: 100%;
    }
  }
</style>