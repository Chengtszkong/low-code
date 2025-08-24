<script setup lang="ts">
import type { TextComponentProps } from '@/defaultProps'
import { mapPropsToForms } from '@/propsMap'
import type { FormProps } from 'ant-design-vue'
import { reduce } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'PropsTable',
})

const emit = defineEmits(['change'])
const props = defineProps<{
  props: Partial<TextComponentProps>
}>()

const finalProps = computed(() => {
  return reduce(
    props.props,
    (result, value, key) => {
      const newKey = key as keyof TextComponentProps
      const item = mapPropsToForms[newKey]
      if (item) {
        const { valueProp = 'value', eventName = 'change', initalTransform, afterTransform } = item
        const newItem: FormProps = {
          ...item,
          value: initalTransform ? initalTransform(value) : value,
          valueProp,
          eventName,
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [eventName]: (e: any) => {
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
</script>

<template>
  <div class="props-table">
    <div class="prop-item" v-for="(value, key) in finalProps" :key="key">
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <component
        :is="value.compnonent"
        :[value.valueProp]="value.value"
        v-bind="value.extraProps"
        v-on="value.events"
      >
        <template v-if="value.options">
          <component
            :is="value.subComponent"
            v-for="(option, k) in value.options"
            :key="k"
            :value="option.value"
          >
            {{ option.text }}
          </component>
        </template>
      </component>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
