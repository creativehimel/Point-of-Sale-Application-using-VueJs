import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import router from '@/router/index.js'
import { useAuthStore } from './auth'
import { getAllBrands } from '@/services/brand_service.js'
const auth = useAuthStore()

export const useBrandStore = defineStore('brand', () => {
  const isLoading = ref(false)
  const brands = reactive([])

  const getBrands = async () => {
    try {
      const response = await getAllBrands(auth.token)
      if (response.status == 200) {
        brands.push(...response.data.data)
      } else {
        toast.error(response.data.message)
        auth.handleLogout()
      }
    } catch (error) {
      if (error.request) {
        toast.error('No response received from the server.')
      } else {
        toast.error(error.message)
      }
    }
  }

  return {
    isLoading,
    brands,
    getBrands
  }
})
