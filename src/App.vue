<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> 
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter } from "vue-router"
import { Store } from 'tauri-plugin-store-api'

(async () => {
  const store = new Store('.settings.dat')
  await store.set('some-key', { value: 5 })
  const val = await store.get('some-key')

  console.log(val, '-----store-----')
})()


</script>

<style lang="scss">
  @import "@/styles/global.scss";
</style>

<style lang="scss" scoped>
  .main {
    width: 100%;
    background-color: #FFFFFF;
  }
</style>
