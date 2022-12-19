<template>
  <div class="wrapper" ref="wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue"

  const wrapper = ref<HTMLElement>()

</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #dfe0e3;
    }

    &::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
</style>
