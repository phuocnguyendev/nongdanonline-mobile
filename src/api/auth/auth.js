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
