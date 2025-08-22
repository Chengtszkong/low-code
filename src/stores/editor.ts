import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { TextComponentProps } from '@/defaultProps'

interface ComponentData {
  props: { [key: string]: unknown }
  id: string // uuid v4 生成
  name: string // 业务组件名称 op-text, op-image 等
}

// 测试数据
export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'op-text', props: { text: 'hello', fontSize: '20px', color: 'red' } },
  { id: uuidv4(), name: 'op-text', props: { text: 'hello2', fontSize: '10px' } },
  { id: uuidv4(), name: 'op-text', props: { text: 'hello3', fontSize: '15px' } },
]

export const useEditorStore = defineStore('editor', () => {
  // state
  const components = ref<ComponentData[]>([]) // 供中间编辑器渲染的数组
  const currentElement = ref<string>('') // 当前编辑的元素，uuid

  components.value = testComponents

  // action
  function addComponent(props: Partial<TextComponentProps>) {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: 'op-text',
      props,
    }
    components.value.push(newComponent)
  }
  function setActive(id: string) {
    currentElement.value = id
  }

  // getter => computed
  const getCurrentElement = computed(() => {
    return components.value.find((component) => component.id === currentElement.value)
  })

  return { components, currentElement, addComponent, setActive, getCurrentElement }
})
