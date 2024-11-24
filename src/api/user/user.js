import { instance } from '../config'

export const getUserInfo = async (userId) => {
  const response = await instance.get(`/users/${userId}`)
  return response.data
}
export const updateUserID = async (userId, data) => {
  const response = await instance.put(`users/${userId}`, data)
  return response.data
}
export const uploadUserAvatar = async (userId, formData) => {
  const response = await instance.put(
    `users/${userId}/change-avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data
}

export const getUserAddress = async (userId) => {
  const response = await instance.get(`user-address/${userId}`)
  return response.data
}

export const postUserAddress = async (data) => {
  const response = await instance.post(`user-address`, data)
  return response.data
}

export const updateUserAddress = async (id, data) => {
  const response = await instance.put(`user-address/${id}`, data)
  return response.data
}

export const deleteUserAddress = async (userAdressId) => {
  const response = await instance.delete(`user-address/${userAdressId}`)
  return response.data
}

export const setDefaultAddress = async (addressId) => {
  const response = await instance.put(`user-address/default/${addressId}`)
  return response.data
}
export const changeUserPassword = async (userId, data) => {
  const response = await instance.put(`users/${userId}/change-password`, data)
  return response.data
}
