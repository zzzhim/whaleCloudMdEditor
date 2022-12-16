<template>
  <div class="slidebar">
    <div class="list">
      <div class="item">
        <DocumentIcon class="icon" @click="handleOpen" />
      </div>

      <div class="item">
        <SearchIcon class="icon" />
      </div>

      <div class="item setting">
        <SettingIcon class="icon" />
      </div>
    </div>

    <div class="menu" v-show="sidebarStore.showMenu">
      <template v-if="menu">
        <section class="box">
          <div class="resource">
            
          </div>
        </section>
      </template>

      <template v-else>
        <section class="box">
          <button class="btn" @click="handleOpenFolder">Open Folder</button>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocumentIcon from '@/svg/icons/document.svg?component'
import SearchIcon from '@/svg/icons/search.svg?component'
import SettingIcon from '@/svg/icons/setting.svg?component'
import { watch, watchImmediate } from 'tauri-plugin-fs-watch-api'
import { useSidebarStore } from '@/store/modules/sidebar'
import { computed, onMounted } from 'vue'
import { openFolder } from '@/utils/dialog'
import { getDirName, getFileList } from '@/utils/path'
import { FileEntry } from '@tauri-apps/api/fs'

const sidebarStore = useSidebarStore()
const menu = computed((): FileEntry | null => {
  if(sidebarStore.fileDir) {

    if(Array.isArray(sidebarStore.fileList) && sidebarStore.fileList.length > 0) {
      return {
        path: sidebarStore.fileDir.path,
        name: sidebarStore.fileDir.name,
        children: sidebarStore.fileList
      }
    }else {
      return sidebarStore.fileDir
    }
  }

  return null
})

// (async () => {
//   const desktopPath = await desktopDir()
//   const path = await resolve(desktopPath, 'jingyun-markdown')

//   const stopWatching = await watch(path, { recursive: true }, (e) => {
//     console.log(e)
//   })

//   console.log(stopWatching)
// })()

const handleOpen = () => {
  sidebarStore.$patch(state => {
    state.showMenu = !state.showMenu
  })
}

const handleOpenFolder = async () => {
  const dirPath = await openFolder() as string

  const fileDir: FileEntry = {
    path: dirPath,
    name: await getDirName(dirPath)
  }

  const fileList = await getFileList(dirPath)

  if(Array.isArray(fileList) && fileList.length > 0) {
    sidebarStore.$patch(state => {
      state.fileList = fileList
      state.fileDir = fileDir
    })
  }
}

// onMounted(() => {
//   sidebarStore.$patch((state) => {
//     state.showMenu = true
//   })
// })

</script>

<style lang="scss" scoped>
  .slidebar {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    // width: 40px;
    height: 100vh;
    background-color: #f5f5f5;
    // background-color: bisque;

    .list {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      width: 40px;
      height: 100vh;
      padding-top: 20px;
      padding-bottom: 20px;
      margin-bottom: -20px;

      .item {
        margin-bottom: 20px;

        &.setting {
          margin-top: auto;
          margin-bottom: 0px;
        }

        .icon {
          width: 25px;
          height: auto;
          fill: #666666;
          cursor: pointer;

          &:hover {
            fill: #333333;
          }
        }
      }
    }

    .menu {
      width: 180px;
      height: 100vh;
      // background-color: #333333;
      background-color: #F0F0F0;

      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .btn {
          width: 100px;
          height: 30px;
          padding: 0px;
          border-radius: 5px;
          color: #FFFFFF;
          border: 1px solid #58D68D;
          background-color: #58D68D;
          cursor: pointer;
        }
      }

      .resource {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>