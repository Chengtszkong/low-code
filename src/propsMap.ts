import type { TextComponentProps } from './defaultProps'

export interface PropToForm {
  compnonent: string
  subComponent?: string
  value?: string
  extraProps?: { [key: string]: unknown }
  text?: string
  options?: { text: string; value: unknown }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initalTransform?: (v: any) => any
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    compnonent: 'a-textarea',
    extraProps: { rows: 3 },
  },
  fontSize: {
    text: '字号',
    compnonent: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
  },
  lineHeight: {
    text: '行高',
    compnonent: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v),
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
