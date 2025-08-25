<script setup lang="ts">
import type { TextComponentProps } from '@/defaultProps'
import OpText from './OpText.vue'

defineOptions({
  name: 'ComponentList',
})
defineProps<{
  list: Partial<TextComponentProps>[]
}>()
const emit = defineEmits(['on-item-click'])

const onItemClick = (data: Partial<TextComponentProps>) => {
  emit('on-item-click', data)
}
</script>

<template>
  <div class="component-list">
    <div
      class="component-item"
      v-for="(item, index) in list"
      :key="index"
      @click="onItemClick(item)"
    >
      <div class="component-item__content">
        <op-text v-bind="item"></op-text>
      </div>
      <div class="component-item__text">{{ item.text }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .component-item {
    display: flex;
    flex-direction: column;
    margin: 5px;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    cursor: pointer;

    &__content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__text {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      color: #666;
      text-align: center;
      background: #f5f5f5;
    }
  }
}
</style>
