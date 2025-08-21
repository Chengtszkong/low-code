<script setup lang="ts">
import UserProfile from './UserProfile.vue'

function handleLogoClick() {
  window.location.href = '/'
}
</script>

<template>
  <a-layout-header class="flex justify-between items-center">
    <span class="text-blue cursor-pointer" @click="handleLogoClick">Lego 低代码</span>
    <user-profile></user-profile>
  </a-layout-header>
</template>

<style scoped lang="scss"></style>
