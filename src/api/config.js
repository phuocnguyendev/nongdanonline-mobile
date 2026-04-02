import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL ||
    'https://api-nongdan-client.nongdanonline.vn/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshToken = async () => {
  try {
    const response = await instance.post('/auth/refresh-token', {
      refreshToken: 'refreshToken',
    })
    const newAccessToken = response.data.accessToken
    await AsyncStorage.setItem('accessToken', newAccessToken)
    return newAccessToken
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw error
  }
}

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshToken()
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return instance(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default instance
