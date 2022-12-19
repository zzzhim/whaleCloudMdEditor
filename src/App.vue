<template>
  <div class="main">
    <!-- {{ created }}
    <br>
    {{ drop }} -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> 
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter } from "vue-router"
import { Store } from 'tauri-plugin-store-api'
import { ref } from "vue"

const created = ref();
const drop = ref();

(async () => {
  const store = new Store('.settings.dat')
  await store.set('some-key', { value: 5 })
  const val = await store.get('some-key')

  console.log(val, '-----store-----')
})()

window.__TAURI__?.event?.listen(window.__TAURI__?.event?.TauriEvent.WINDOW_CREATED, (e) => {
  console.log(e, "created")
  created.value = `${e} created`
})

window.__TAURI__?.event?.listen(window.__TAURI__?.event?.TauriEvent.WINDOW_FILE_DROP, (e) => {
  console.log(e, "file-drop")
  drop.value = `${e} drop`
})

window.__TAURI__?.event?.listen(window.__TAURI__?.event?.TauriEvent.WINDOW_FILE_DROP, (e) => {
  console.log(e, "file-drop")
  drop.value = `${e} drop`
})


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
