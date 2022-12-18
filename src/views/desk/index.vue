<template>
  <div class="page">
    <Sidebar />

    <div class="content">
      <div class="tabs">
        <Tabs />
      </div>

      <div class="editor">
        <Editor />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from "vue"
// export { default as Editor } from "@/components/Editor/index.vue"
import Editor from "@/components/Editor/index.vue"
import Sidebar from "@/components/Sidebar/index.vue"
import Tabs from "@/components/Tabs/index.vue"


// defineComponent({
//   Editor
// })

onMounted(() => {
})


</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100vh;

    .content {
      width: calc(100% - 40px);
      height: 100%;
      padding-top: 40px;
      background-color: #FFFFFF;
      overflow: hidden;
      position: relative;

      .tabs {
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 10;
      }

      .editor {
        width: 100%;
        height: 100%;
        // margin-top: 20px;
      }
    }
  }
</style>