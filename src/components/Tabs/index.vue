<template>
  <div class="tabs">
    <ul class="list">
      <template v-for="(item, index) in tabsState.tabs" :key="item.path">
        <li
          :class="[
            'item',
            {
              active: activeTab === item.path
            }
          ]"
          @click="handleClick(item.path)"
        >
          <span class="text">{{ item.name }}</span>
          <closeIcon class="close" @click.stop="handleClose(item.path)" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useTabsStore } from '@/store/modules/tabs'
  import closeIcon from '@/svg/icons/close.svg?component'
  import { computed, nextTick } from 'vue'

  const tabsState = useTabsStore()
  const activeTab = computed(() => tabsState.activeTab)

  const handleClick = (path: string) => {
    tabsState.$patch(state => {
      state.activeTab = path
    })
  }

  const handleClose = (path: string) => {
    const tabs = tabsState.tabs.filter(item => item.path !== path)

    if (tabs.length) {
      tabsState.$patch(state => {
        state.tabs = tabs
      })

      if(activeTab.value === path) {
        nextTick(() => {
          handleClick(tabs[0].path)
        })
      }
    } else {
      tabsState.$patch(state => {
        state.tabs = tabs
        state.activeTab = ''
      })
    }
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
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        padding-bottom: 10px;
        cursor: pointer;
        position: relative;
        
        .text {
          font-size: 12px;
          color: #666666;
        }

        .close {
          display: none;
          width: 12px;
          height: 12px;
          margin-left: 5px;
          fill: #666666;
        }

        &:hover {
          .text {
            color: #58D68D;
          }

          .close {
            display: inline-block;
            fill: #58D68D;
          }
        }

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