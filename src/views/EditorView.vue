<!-- 编辑器 -->

<script setup lang="ts">
import type { Component } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { defaultTextTemplates } from '@/defaultTemplates'
import type { TextComponentProps } from '@/defaultProps'

import OpText from '@/components/OpText.vue'
import ComponentList from '@/components/ComponentList.vue'
import EditWrapper from '@/components/EditWrapper.vue'
import PropsTable from '@/components/PropsTable.vue'

const editorStore = useEditorStore()

const componentsMap: Record<string, Component> = {
  'op-text': OpText,
}

const addItem = (props: Partial<TextComponentProps>) => {
  editorStore.addComponent(props)
}

const setActive = (id: string) => {
  editorStore.setActive(id)
}
</script>

<template>
  <a-layout :style="{ height: '100vh', background: '#fff' }">
    <a-layout-sider width="300" style="background: #fff">
      <component-list :list="defaultTextTemplates" @on-item-click="addItem"></component-list>
    </a-layout-sider>

    <a-layout-content style="background: #f2f2f2">
      <edit-wrapper
        v-for="component in editorStore.components"
        :key="component.id"
        :id="component.id"
        :active="component.id === editorStore.getCurrentElement?.id"
        @set-active="setActive"
      >
        <component :is="componentsMap[component.name]" v-bind="component.props"></component>
      </edit-wrapper>
    </a-layout-content>

    <a-layout-sider width="300" style="background: #fff">
      组件属性
      <props-table
        v-if="editorStore.getCurrentElement && editorStore.getCurrentElement.props"
        :props="editorStore.getCurrentElement.props"
      ></props-table>
      <pre>
        {{ editorStore.getCurrentElement?.props }}
      </pre>
    </a-layout-sider>
  </a-layout>
</template>

<style scoped lang="scss"></style>
