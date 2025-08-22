<script setup lang="ts">
import { defaultProps, textStylePropNames } from '@/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'

defineOptions({
  name: 'OpText',
})

const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  ...defaultProps,
})

const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames)
</script>

<template>
  <component :is="tag" :style="styleProps" class="op-text" @click="handleClick">
    <slot>{{ text }}</slot>
  </component>
</template>

<style scoped lang="scss"></style>
