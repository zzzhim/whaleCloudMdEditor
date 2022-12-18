<template>
  <div class="tabs">
    <ul class="list">
      <template v-for="(item, index) in tabsState.tabs" :key="item.path">
        <li
          :class="[
            'item',
            {
              active: tabsState.activeTab === item.path
            }
          ]"
          @click="handleClick(item.path)"
        >{{ item.name }}</li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useTabsStore } from '@/store/modules/tabs'

  const tabsState = useTabsStore()

  const handleClick = (path: string) => {
    tabsState.$patch(state => {
      state.activeTab = path
    })
  }

</script>

<style lang="scss" scoped>
  .tabs {
    width: 100%;
    height: 40px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);

    .list {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      height: 40px;
      margin-left: -20px;
      padding: 0px 20px;

      .item {
        font-size: 12px;
        color: #666666;
        margin-left: 20px;
        padding-bottom: 10px;
        cursor: pointer;
        position: relative;

        &.active {
          color: #58D68D;

          &::before {
            content: "";
            width: 40px;
            height: 2px;
            background-color: #58D68D;
            position: absolute;
            left: 50%;
            bottom: -1px;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
</style>