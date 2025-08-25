<!-- 编辑器 -->

<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { defaultTextTemplates } from '@/defaultTemplates'
import type { TextComponentProps } from '@/defaultProps'

import OpText from '@/components/OpText.vue'
import ComponentList from '@/components/ComponentList.vue'
import EditWrapper from '@/components/EditWrapper.vue'
import PropsTable from '@/components/PropsTable'

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
const removeActive = (id: string) => {
  editorStore.removeActive(id)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleChange = (e: any) => {
  editorStore.updateComponent(e)
}

const openPropsTable = ref<boolean>(false)
const isActivePropsTable = computed(() => {
  return openPropsTable.value || !!editorStore.getCurrentElement
})
</script>

<template>
  <a-layout :style="{ height: '100vh', background: '#fff' }">
    <!-- 组件列表面板 -->
    <a-layout-sider width="244" style="padding: 12px; background: #fff">
      <component-list :list="defaultTextTemplates" @on-item-click="addItem"></component-list>
    </a-layout-sider>

    <!-- 编辑器面板 -->
    <a-layout-content style="background: #f2f2f2">
      <edit-wrapper
        v-for="component in editorStore.components"
        :key="component.id"
        :id="component.id"
        :active="component.id === editorStore.getCurrentElement?.id"
        @set-active="setActive"
        @remove-active="removeActive"
      >
        <component :is="componentsMap[component.name]" v-bind="component.props"></component>
      </edit-wrapper>
    </a-layout-content>

    <!-- 组件属性面板 -->
    <a-drawer
      root-class-name="props-table-drawer"
      v-model:open="isActivePropsTable"
      title="组件属性"
      :closable="false"
      width="300"
      placement="right"
      :mask="false"
    >
      <props-table
        v-if="editorStore.getCurrentElement && editorStore.getCurrentElement.props"
        :props="editorStore.getCurrentElement.props"
        @change="handleChange"
      ></props-table>
      <pre>
        {{ editorStore.getCurrentElement?.props }}
      </pre>
    </a-drawer>
    <a-button
      class="open-props-table-button"
      :style="{ right: isActivePropsTable ? '300px' : '0' }"
      @click="openPropsTable = !openPropsTable"
    >
      <i
        class="bi"
        :class="[isActivePropsTable ? 'bi-chevron-double-right' : 'bi-chevron-double-left']"
      ></i>
    </a-button>
  </a-layout>
</template>

<style scoped lang="scss">
.open-props-table-button {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  transition: all 0.3s;
  height: 64px;
  padding: 4px;
  border: 1px solid #e8e8e8;
  border-right: none;
  border-radius: 12px 0 0 12px;
}
</style>
