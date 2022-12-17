<template>
  <div class="tree" :style="{ paddingLeft: `${props.index * 20}px` }">
    <div class="tree-item">
      <template v-if="iconType === 'dir'">
        <FolderIcon class="icon" />
      </template>

      <template v-else-if="iconType === 'md'">
        <MdIcon class="icon" />
      </template>

      <template v-else-if="iconType === 'png'">
        <ImageIcon class="icon" />
      </template>

      <label class="label">{{ tree.name }}</label>
    </div>

    <div
      class="tree-children"
      v-if="Array.isArray(tree.children) && tree.children.length > 0"
    >
      <template v-for="(item, index) in tree.children" :key="index">
        <SiderbarTree :tree="item" :index="props.index + 1" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FolderIcon from '@/svg/icons/folder.svg?component'
import MdIcon from '@/svg/icons/md.svg?component'
import ImageIcon from '@/svg/icons/image.svg?component'
import { FileEntry } from '@tauri-apps/api/fs'
import { onMounted, computed } from 'vue'

const props = withDefaults(defineProps<{
  tree: FileEntry
  index: number
}>(), {
  index: 0
})

const tree = computed(() => props.tree)

const iconType = computed(() => {
  if(Array.isArray(tree.value.children)) {
    return 'dir'
  }

  const arr = tree.value.name?.split('.') ?? []

  const suffix = arr[arr?.length - 1].toLocaleLowerCase()

  return suffix
})


onMounted(() => {
  console.log(props, 'props')
})

</script>

<style lang="scss" scoped>
.tree {
  width: 100%;

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

    .icon {
      width: 15px;
      height: 15px;
      fill: #666666;
      margin-right: 5px;
    }

    .label {
      width: calc(100% - 20px);
      color: #666666;
      font-size: 12px;
    }
  }

  &-children {
    width: 100%;
    // padding-left: 20px;
  }
}
</style>