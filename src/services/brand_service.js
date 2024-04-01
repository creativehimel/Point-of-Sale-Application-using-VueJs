import { http } from '@/services/http_service.js'

export function getAllBrands(token) {
  return http().get('/brands', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function storeBrand(data, token) {
  return http().post('/brands', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function getBrand(id, token) {
  return http().get(`/brands/${id}/edit`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function updateBrand(id, data, token) {
  return http().put(`/brands/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function destroyBrand(id, token) {
  return http().delete(`/brands/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
