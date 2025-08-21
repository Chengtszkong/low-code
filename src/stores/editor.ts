import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

interface ComponentData {
  props: { [key: string]: unknown }
  id: string // uuid v4 生成
  name: string // 业务组件名称 op-text, op-image 等
}

// export interface EditorProps {
//   components: ComponentData[] // 供中间编辑器渲染的数组
//   currentElement: string // 当前编辑的元素，uuid
// }

// 测试数据
export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'op-text', props: { text: 'hello', fontSize: '20px' } },
  { id: uuidv4(), name: 'op-text', props: { text: 'hello2', fontSize: '10px' } },
  { id: uuidv4(), name: 'op-text', props: { text: 'hello3', fontSize: '15px' } },
]

export const useEditorStore = defineStore('editor', () => {
  // state
  const components = ref<ComponentData[]>([]) // 供中间编辑器渲染的数组
  const currentElement = ref<string>('') // 当前编辑的元素，uuid

  components.value = testComponents

  return { components, currentElement }
})
