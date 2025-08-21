import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
}

const templates: TemplateProps[] = [
  {
    id: 1,
    title: '模版 1',
    coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    author: '张三',
    copiedCount: 1,
  },
  {
    id: 2,
    title: '模版 2',
    coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    author: '李四',
    copiedCount: 10,
  },
  {
    id: 3,
    title: '模版 3',
    coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    author: '赵五',
    copiedCount: 10,
  },
  {
    id: 4,
    title: '模版 4',
    coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    author: '孙六',
    copiedCount: 130,
  },
]

export const useTemplateStore = defineStore('template', () => {
  // state
  const list = ref<TemplateProps[]>([])
  list.value = templates

  // getters
  const getTemplateById = (id: number) => {
    return list.value.find((item) => item.id === id)
  }

  return { list, getTemplateById }
})
