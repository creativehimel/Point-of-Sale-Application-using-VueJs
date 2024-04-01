import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import router from '@/router/index.js'
import { useAuthStore } from './auth'
import {
  getAllBrands,
  storeBrand,
  getBrand,
  updateBrand,
  destroyBrand
} from '@/services/brand_service.js'
const auth = useAuthStore()

export const useBrandStore = defineStore('brand', () => {
  const isLoading = ref(false)
  const brands = reactive([])
  const singleBand = ref({})

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

  const handleStoreBrand = async (data) => {
    try {
      const response = await storeBrand(data, auth.token)
      if (response.status == 201) {
        toast.success(response.data.message)
        setTimeout(() => {
          router.push('/admin/brands')
        }, 1500)
      } else {
        toast.error(response.data.message)
      }
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
  }

  const getBrandById = async (id) => {
    try {
      const response = await getBrand(id, auth.token)
      if (response.status == 200) {
        singleBand.value = response.data.data
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

  const handleUpdateBrand = async (id, data) => {
    try {
      const response = await updateBrand(id, data, auth.token)
      if (response.status == 200) {
        toast.success(response.data.message)
        setTimeout(() => {
          router.push('/admin/brands')
        }, 1500)
      } else {
        toast.error(response.data.message)
      }
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
  }

  const handleDestroyBrand = async (id) => {
    try {
      const response = await destroyBrand(id, auth.token)
      if (response.status == 200) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
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
    singleBand,
    getBrands,
    handleStoreBrand,
    getBrandById,
    handleUpdateBrand,
    handleDestroyBrand
  }
})
