<!-- 编辑器 -->

<script setup lang="ts">
import type { Component } from 'vue'
import { useEditorStore } from '@/stores/editor'
import OpText from '@/components/OpText.vue'
import ComponentList from '@/components/ComponentList.vue'
import { defaultTextTemplates } from '@/defaultTemplates'
import type { TextComponentProps } from '@/defaultProps'

const editorStore = useEditorStore()

const componentsMap: Record<string, Component> = {
  'op-text': OpText,
}

const addItem = (props: Partial<TextComponentProps>) => {
  editorStore.addComponent(props)
}
</script>

<template>
  <a-layout :style="{ height: '100vh', background: '#fff' }">
    <a-layout-sider width="300" style="background: yellow">
      <component-list :list="defaultTextTemplates" @on-item-click="addItem"></component-list>
    </a-layout-sider>

    <a-layout-content>
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
