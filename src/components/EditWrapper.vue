<!-- 编辑面板 -->

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['set-active'])

const onItemClick = (id: string) => {
  emit('set-active', id)
}
</script>

<template>
  <div class="edit-wrapper" :class="{ active }" @click="onItemClick(id)">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;

  &:hover {
    border: 1px dashed #ccc;
  }
  &.active {
    border: 1px solid #1890ff;
    user-select: none;
    z-index: 100;
  }
}
</style>
