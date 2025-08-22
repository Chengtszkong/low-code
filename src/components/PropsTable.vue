<script setup lang="ts">
import type { TextComponentProps } from '@/defaultProps'
import { mapPropsToForms, type PropsToForms } from '@/propsMap'
import { reduce } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'PropsTable',
})

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
        item.value = item.initalTransform ? item.initalTransform(value) : value
        result[newKey] = item
      }

      return result
    },
    {} as Required<PropsToForms>,
  )
})
</script>

<template>
  <div class="props-table">
    <div class="prop-item" v-for="(value, key) in finalProps" :key="key">
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <component :is="value.compnonent" :value="value.value" v-bind="value.extraProps">
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
