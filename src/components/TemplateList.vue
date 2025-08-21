<script setup lang="ts">
import type { TemplateProps } from '@/stores/template'

defineProps<{
  list: TemplateProps[]
}>()
</script>

<template>
  <div class="template-list-component">
    <a-row :gutter="16">
      <a-col :span="4" class="min-w-[240px]" v-for="item in list" :key="item.id">
        <a-card
          hoverable
          size="small"
          @click="$router.push({ name: 'template', params: { id: item.id } })"
        >
          <template #cover>
            <img alt="example" :src="item.coverImg" />
          </template>
          <a-card-meta :title="item.title">
            <template #description>
              <div class="flex justify-between">
                <span>{{ item.author }}</span>
                <span>{{ item.copiedCount }}</span>
              </div>
            </template>
          </a-card-meta>
          <template #actions>
            <a-button type="primary" @click.stop="$router.push({ name: 'editor' })">
              使用该模版
            </a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss"></style>
