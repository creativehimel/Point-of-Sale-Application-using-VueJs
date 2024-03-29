import { http } from '@/services/http_service.js'

export function register(data) {
  return http().post('auth/register', data)
}

export function login(data) {
  return http().post('auth/login', data)
}

export function logout(token) {
  return http().get('/logout', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function forgetPassword(data) {
  return http().post('auth/forget-password', data)
}
export function verifyOTP(data) {
  return http().post('auth/verify-code', data)
}

export function resetPassword(data) {
  return http().post('auth/reset-password', data)
}
