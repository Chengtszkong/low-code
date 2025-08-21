<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
const [messageApi, contextHolder] = message.useMessage()

const userStore = useUserStore()

function login() {
  userStore.login('张三风')
  messageApi.success('登录成功')
}

function logout() {
  userStore.logout()
  messageApi.success('退出登录成功，2秒后跳转到首页')
  setTimeout(() => {
    window.location.href = '/'
  }, 2000)
}
</script>

<template>
  <context-holder />
  <div v-if="userStore.isLogin">
    <a-dropdown-button>
      <router-link to="/editor">{{ userStore.userName }}</router-link>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
  <a-button type="primary" v-else @click="login">登录</a-button>
</template>

<style scoped lang="scss"></style>
