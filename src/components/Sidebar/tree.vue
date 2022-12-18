<template>
  <div
    :class="[
      'tree',
      {
        'expand': expand,
        'shrink': !expand
      }
    ]"
    :style="{ height: props.index === 0 ? '100%' : 'auto' }"
  >
    <div
      class="tree-item"
      @click="handleClick"
      :style="{ paddingLeft: `${props.index * 20}px` }"
    >
      <span class="first">
        <template v-if="iconType === 'dir'">
          <FolderOpenIcon class="icon" v-show="expand" />

          <FolderIcon class="icon" v-show="!expand" />
        </template>

        <template v-else-if="markdownSuffix.includes(iconType)">
          <MdIcon class="icon" />
        </template>

        <template v-else-if="imageSuffix.includes(iconType)">
          <ImageIcon class="icon" />
        </template>
      </span>

      <label class="label" :title="tree.name">{{ tree.name }}</label>
    </div>

    <Scroll v-if="props.index === 0" class="tree-scroll">
      <div
        class="tree-children"
        v-if="Array.isArray(tree.children) && tree.children.length > 0"
      >
        <template v-for="(item, index) in tree.children" :key="index">
          <SiderbarTree :tree="item" :index="props.index + 1" />
        </template>
      </div>
    </Scroll>

    <template v-else>
      <div
        class="tree-children"
        v-if="Array.isArray(tree.children) && tree.children.length > 0"
      >
        <template v-for="(item, index) in tree.children" :key="index">
          <SiderbarTree :tree="item" :index="props.index + 1" />
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import FolderIcon from '@/svg/icons/folder.svg?component'
import FolderOpenIcon from '@/svg/icons/folder-open.svg?component'
import MdIcon from '@/svg/icons/md.svg?component'
import ImageIcon from '@/svg/icons/image.svg?component'
import { FileEntry } from '@tauri-apps/api/fs'
import { onMounted, computed, ref, toRefs } from 'vue'
import { imageSuffix, markdownSuffix } from '@/config'
import { getFileList } from '@/utils/path'
import { filterSidebarFile } from '@/utils/filter'
import Scroll from "@/components/Scroll/index.vue"
import { useTuiEditorStore } from '@/store/modules/tui_editor'
import { getMdFileContent } from '@/utils/fs'
import { emitter } from '@/utils/emitter'
import { useTabsStore } from '@/store/modules/tabs'

const props = withDefaults(defineProps<{
  tree: FileEntry
  index: number
}>(), {
  index: 0
})

const tabsState = useTabsStore()
const expand = ref<boolean>(props.index === 0)

const tree = computed(() => props.tree)

const iconType = computed(() => {
  if(Array.isArray(tree.value.children)) {
    return 'dir'
  }

  const arr = tree.value.name?.split('.') ?? []

  const suffix = arr[arr?.length - 1].toLocaleLowerCase()

  return suffix
})

const handleClick = async () => {
  if(Array.isArray(tree.value.children)) { // 目录
    const fileList = await getFileList(tree.value?.path)

    if(Array.isArray(fileList)) {
      tree.value.children = filterSidebarFile(fileList)
    }

    expand.value = !expand.value

    return 
  }

  const arr = tree.value.name?.split('.') ?? []

  const suffix = arr[arr?.length - 1].toLocaleLowerCase()

  if(markdownSuffix.includes(suffix)) { // markdown 格式
    const path = tree.value?.path

    const content = await getMdFileContent(path)

    const find = tabsState.tabs.find(item => item.path === tree.value.path)

    if(!find) {
      arr.pop()

      const tab = {
        ...tree.value,
        title: arr.join('.'),
        content: content ?? '',
      }

      tabsState.$patch(state => {
        state.tabs = [
          ...state.tabs,
          tab
        ]

        state.activeTab = tab.path
      })
    }else {
      tabsState.$patch(state => {
        state.activeTab = find.path
      })
    }

    return 
  }
}

onMounted(() => {
})

</script>

<style lang="scss" scoped>

.tree {
  width: 100%;
  user-select: none;

  // &.expand {
  //   height: auto !important;
  // }

  &.shrink {
    height: 30px !important;
    overflow: hidden;
  }

  &-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 2px 5px;
    background-color: #F0F0F0;
    cursor: pointer;

    &:hover {
      background-color: #F5F5F5;
    }

    .first {
      box-sizing: content-box;
      width: 15px;
      height: 15px;
      padding-left: 5px;
      padding-right: 5px;

      .icon {
        width: 15px;
        height: 15px;
        fill: #666666;
      }
    }


    .label {
      width: calc(100% - 25px);
      height: 30px;
      color: #666666;
      font-size: 12px;
      line-height: 30px;
      @include mixin-textHidden;
    }
  }

  &-scroll {
    width: 100%;
    height: calc(100% - 30px);
  }

  &-children {
    width: 100%;
    // padding-left: 20px;
  }
}
</style>