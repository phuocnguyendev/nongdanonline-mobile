import { instance } from '../config'

export const postRegister = async (data) => {
  const response = await instance.post('/auth/register', data)
  return response.data
}

export const postForgotPass = async (data) => {
  const response = await instance.post('/auth/forgot-password', data)
  return response.data
}
export const postLogin = async (data) => {
  const response = await instance.post('/auth/login', data)
  return response.data
}
export const postLoginGoogle = async () => {
  const response = await instance.post('/auth/google-login')
  return response.data
}
export const postLoginApple = async () => {
  const response = await instance.post('/auth/apple-login')
  return response.data
}
export const postResetPass = async (data) => {
  const response = await instance.post('/auth/reset-password', data)
  return response.data
}
export const postChangePass = async (data) => {
  const response = await instance.post('/auth/change-password', data)
  return response.data
}
export const postLogout = async () => {
  const response = await instance.post('/auth/logout')
  return response.data
}
export const postRefreshToken = async () => {
  const response = await instance.post('/auth/refresh-token')
  return response.data
}
export const postVerifyEmail = async (data) => {
  const response = await instance.post('/auth/verify-email', data)
  return response.data
}
export const postResendEmail = async (data) => {
  const response = await instance.post('/auth/resend-email', data)
  return response.data
}
