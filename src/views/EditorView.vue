<!-- 编辑器 -->

<script setup lang="ts">
import type { Component } from 'vue'
import { useEditorStore } from '@/stores/editor'
import OpText from '@/components/OpText.vue'

const editorStore = useEditorStore()

const componentsMap: Record<string, Component> = {
  'op-text': OpText,
}
</script>

<template>
  <a-layout>
    <a-layout-sider width="300" style="background: yellow">1</a-layout-sider>

    <a-layout-content class="relative">
      <component
        v-for="component in editorStore.components"
        :key="component.id"
        :is="componentsMap[component.name]"
        v-bind="component.props"
      ></component>
    </a-layout-content>

    <a-layout-sider width="300" style="background: yellow">2</a-layout-sider>
  </a-layout>
</template>

<style scoped lang="scss"></style>
