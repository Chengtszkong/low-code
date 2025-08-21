<!-- 模版详情 -->

<script setup lang="ts">
import { useTemplateStore } from '@/stores/template'
import { useRoute } from 'vue-router'

const route = useRoute()
const templateStore = useTemplateStore()
const id = route.params.id as string
const template = templateStore.getTemplateById(parseInt(id))
</script>

<template>
  <div v-if="template" class="px-6 py-9 flex items-start justify-center">
    <img style="width: 300px; border-radius: 8px" alt="" :src="template.coverImg" />
    <section class="ml-6">
      <h2>{{ template.title }}</h2>
      <div class="mb-5">
        该模版由 <span class="text-blue">{{ template.author }}</span> 创作
      </div>
      <a-qrcode error-level="H" :value="template.author" />
      <a-space warp class="mt-5">
        <a-button type="primary" @click="$router.push({ name: 'editor' })">使用模版</a-button>
        <a-button type="default">下载图片海报</a-button>
      </a-space>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
