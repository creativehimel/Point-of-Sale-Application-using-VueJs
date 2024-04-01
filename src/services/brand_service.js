import { http } from '@/services/http_service.js'

export function getAllBrands(token) {
  return http().get('/brands', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
