import type { TextComponentProps } from '@/defaultProps'
import { mapPropsToForms } from '@/propsMap'
import { Input, InputNumber, Radio, Select, Slider } from 'ant-design-vue'
import { reduce } from 'lodash-es'
import { computed, defineComponent, type VNode } from 'vue'

const mapToComponent = {
  'a-textarea': Input.TextArea,
  'a-input-number': InputNumber,
  'a-slider': Slider,
  'a-radio-group': Radio.Group,
  'a-radio-button': Radio.Button,
  'a-select': Select,
  'a-select-option': Select.Option,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

interface FormProps {
  component: string
  subComponent?: string
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraProps?: { [key: string]: any }
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: { text: string | VNode; value: any }[]
  valueProp: string
  eventName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: { [key: string]: (e: any) => void }
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default defineComponent({
  name: 'PropsTable',
  props: {
    props: {
      type: Object as () => Partial<TextComponentProps>,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if (item) {
            const {
              valueProp = 'value',
              eventName = 'change',
              initalTransform,
              afterTransform,
            } = item
            const newItem: FormProps = {
              ...item,
              value: initalTransform ? initalTransform(value) : value,
              valueProp,
              eventName,
              events: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ['on' + capitalizeFirstLetter(eventName)]: (e: any) => {
                  emit('change', { key, value: afterTransform ? afterTransform(e) : e })
                },
              },
            }
            result[newKey] = newItem
          }
          return result
        },
        {} as { [key: string]: FormProps },
      )
    })

    return () => (
      <div class="props-table">
        {Object.keys(finalProps.value).map((key) => {
          const value = finalProps.value[key]
          const ComponentName = mapToComponent[value.component]
          const SubComponent = value.subComponent ? mapToComponent[value.subComponent] : null
          const props = {
            [value.valueProp]: value.value,
            ...value.extraProps,
            ...value.events,
          }
          return (
            <div key={key} class="prop-item">
              {value.text && <span class="label">{value.text}</span>}
              <div class="prop-component">
                <ComponentName {...props}>
                  {value.options &&
                    value.options.map((option) => {
                      return <SubComponent value={option.value}>{option.text}</SubComponent>
                    })}
                </ComponentName>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
})
