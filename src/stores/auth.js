import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import router from '@/router/index.js'
import {
  register,
  login,
  logout,
  forgetPassword,
  verifyOTP,
  resetPassword
} from '@/services/auth_service.js'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoading = ref(false)
    const isLoggedIn = ref(false)
    const token = ref('')
    const userEmail = ref('')
    const verifiedOTP = ref(false)

    // Register Handler Function
    const handleRegister = async (data) => {
      isLoading.value = true
      try {
        const response = await register(data)
        if (response.status == 201) {
          toast.success(response.data.message)
          setTimeout(() => {
            router.push('/auth/login')
          }, 1500)
        } else {
          toast.error(response.data.message)
        }
        console.log(response.data.message)
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            let errorList = error.response.data.errors
            for (let key in errorList) {
              toast.error(errorList[key][0])
            }
          }
        } else if (error.request) {
          toast.error('No response received from the server.')
        } else {
          toast.error(error.message)
        }
      }
      isLoading.value = false
    }

    // Login Handler Function
    const handleLogin = async (user) => {
      isLoading.value = true
      try {
        const response = await login(user)
        toast.success(response.data.message)
        token.value = response.data.data.token
        isLoggedIn.value = true
        localStorage.setItem('isLoggedIn', 'true')
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 1500)
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            let errorList = error.response.data.errors
            for (let key in errorList) {
              toast.error(errorList[key][0])
            }
          }
          if (error.response.data.status == 401) {
            toast.error(error.response.data.message)
          }
        } else if (error.request) {
          toast.error('No response received from the server.')
        } else {
          toast.error(error.message)
        }
      }
      isLoading.value = false
    }

    return {
      isLoading,
      isLoggedIn,
      token,
      userEmail,
      verifiedOTP,
      handleRegister,
      handleLogin
    }
  },
  {
    persist: true
  }
)
