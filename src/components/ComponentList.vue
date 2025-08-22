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
  <div class="component-item" v-for="(item, index) in list" :key="index" @click="onItemClick(item)">
    <op-text v-bind="item"></op-text>
  </div>
</template>

<style scoped lang="scss"></style>
