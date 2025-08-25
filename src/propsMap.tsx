import { type VNode } from 'vue'
import type { TextComponentProps } from './defaultProps'

export interface PropToForm {
  component: string
  subComponent?: string
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraProps?: { [key: string]: any }
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: { text: string | VNode; value: any }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initalTransform?: (v: any) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterTransform?: (v: any) => any
  valueProp?: string
  eventName?: string
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

const fontWeightArr = [
  { text: 'normal', value: 'normal' },
  { text: 'lighter', value: 'lighter' },
  { text: 'bold', value: 'bold' },
  { text: 'bolder', value: 'bolder' },
  { text: '100', value: '100' },
  { text: '200', value: '200' },
  { text: '300', value: '300' },
  { text: '400', value: '400' },
  { text: '500', value: '500' },
  { text: '600', value: '600' },
  { text: '700', value: '700' },
  { text: '800', value: '800' },
  { text: '900', value: '900' },
  { text: '1000', value: '1000' },
]
const fontWeightOptions = fontWeightArr.map((font) => {
  return {
    value: font.value,
    text: (<span style={{ fontWeight: font.value }}>{font.text}</span>) as VNode,
  }
})

const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' },
]
const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    text: (<span style={{ fontFamily: font.value }}>{font.text}</span>) as VNode,
  }
})

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { rows: 3 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  fontWeight: {
    text: '字重',
    component: 'a-select',
    subComponent: 'a-select-option',
    options: [...fontWeightOptions],
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      { text: '左', value: 'left' },
      { text: '中', value: 'center' },
      { text: '右', value: 'right' },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [{ text: '无', value: '' }, ...fontFamilyOptions],
  },
}
