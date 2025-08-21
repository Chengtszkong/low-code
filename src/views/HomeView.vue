<script setup lang="ts">
import { useTemplateStore } from '@/stores/template'
import TemplateList from '@/components/TemplateList.vue'

const templateStore = useTemplateStore()
</script>

<template>
  <template-list :list="templateStore.list"></template-list>
</template>

<style scoped lang="scss"></style>
