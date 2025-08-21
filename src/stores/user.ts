import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // state
  const isLogin = ref<boolean>(false)
  const userName = ref<string>('')

  // action
  function login(name: string) {
    isLogin.value = true
    userName.value = name
  }

  function logout() {
    isLogin.value = false
  }

  return { isLogin, userName, login, logout }
})
