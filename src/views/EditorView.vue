<!-- 编辑器 -->

<script setup lang="ts">
import type { Component } from 'vue'
import { useEditorStore } from '@/stores/editor'
import OPText from '@/components/OText.vue'

const editorStore = useEditorStore()

const componentsMap: Record<string, Component> = {
  'op-text': OPText,
}
</script>

<template>
  <a-layout>
    <a-layout-sider width="300" style="background: yellow"> </a-layout-sider>

    <a-layout-content>
      <component
        v-for="component in editorStore.components"
        :key="component.id"
        :is="componentsMap[component.name]"
        v-bind="component.props"
      ></component>
    </a-layout-content>

    <a-layout-sider width="300" style="background: yellow"></a-layout-sider>
  </a-layout>
</template>

<style scoped lang="scss"></style>
