<!-- 主布局 -->

<script setup lang="ts">
import HeaderLayout from '@/components/HeaderLayout.vue'
</script>

<template>
  <a-layout :style="{ minHeight: '100%', background: '#fff' }">
    <header-layout></header-layout>
    <a-layout-content :style="{ minHeight: 'calc(100% - 128px)', padding: '24px' }">
      <router-view />
    </a-layout-content>
    <a-layout-footer> ©️ Chengtszkong 版权所有 </a-layout-footer>
  </a-layout>
</template>

<style scoped lang="scss"></style>
