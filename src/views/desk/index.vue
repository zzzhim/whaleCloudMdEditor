<template>
  <div class="page">
    <Sidebar />

    <div class="content">
      <Editor />
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from "vue"
// export { default as Editor } from "@/components/Editor/index.vue"
import Editor from "@/components/Editor/index.vue"
import Sidebar from "@/components/Sidebar/index.vue"


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

    .content {
      width: calc(100% - 40px);
      background-color: #FFFFFF;
    }
  }
</style>