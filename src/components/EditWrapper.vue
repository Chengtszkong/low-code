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
const emit = defineEmits(['set-active', 'remove-active'])

const onItemClick = (id: string) => {
  emit('set-active', id)
}
const onRemoveItemClick = (id: string) => {
  emit('remove-active', id)
}
</script>

<template>
  <div class="edit-wrapper" :class="{ active }" @click="onItemClick(id)">
    <slot />
    <i class="bi bi-x-circle" @click.stop="onRemoveItemClick(id)"></i>
  </div>
</template>

<style scoped lang="scss">
.edit-wrapper {
  position: relative;
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;

  .bi-x-circle {
    display: none;
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    color: gray;
    font-size: 16px;
  }

  &:hover {
    border: 1px dashed #e8e8e8;
  }
  &.active {
    border: 1px solid #1890ff;
    user-select: none;
    z-index: 100;
    .bi-x-circle {
      display: inline-block;
    }
  }
}
</style>
