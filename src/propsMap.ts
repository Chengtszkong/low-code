import type { TextComponentProps } from './defaultProps'

export interface PropToForm {
  compnonent: string
  subComponent?: string
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraProps?: { [key: string]: any }
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: { text: string; value: any }[]
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

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    compnonent: 'a-textarea',
    extraProps: { rows: 3 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    compnonent: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  lineHeight: {
    text: '行高',
    compnonent: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    compnonent: 'a-radio-group',
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
    compnonent: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [
      { text: '无', value: '' },
      { text: '宋体', value: '"SimSun","STSong"' },
      { text: '黑体', value: '"SimHei","STHeiti"' },
      { text: '楷体', value: '"KaiTi","STKaiti"' },
      { text: '仿宋', value: '"FangSong","STFangsong"' },
    ],
  },
}
