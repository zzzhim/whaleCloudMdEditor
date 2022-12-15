<template>
  <div class="slidebar">
    <div class="list">
      <div class="item">
        <DocumentIcon class="icon" />
      </div>

      <div class="item">
        <SearchIcon class="icon" />
      </div>

      <div class="item setting">
        <SettingIcon class="icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocumentIcon from '@/svg/icons/document.svg?component'
import SearchIcon from '@/svg/icons/search.svg?component'
import SettingIcon from '@/svg/icons/setting.svg?component'

</script>

<style lang="scss" scoped>
  .slidebar {
    width: 40px;
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
  }
</style>