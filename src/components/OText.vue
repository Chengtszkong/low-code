<script setup lang="ts">
import { pick } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'OpText',
})
const props = defineProps({
  /**
   * @description 文本内容
   */
  text: String,
  /**
   * @description 文本字体大小
   */
  fontSize: String,
  /**
   * @description element tag of the op-text
   */
  tag: {
    type: String,
    default: 'div',
  },
})

const styleProps = computed(() => pick(props, ['fontSize']))
console.log(styleProps.value)
</script>

<template>
  <component :is="tag" :style="styleProps" class="op-text">
    <slot>{{ text }}</slot>
  </component>
</template>

<style scoped lang="scss"></style>
