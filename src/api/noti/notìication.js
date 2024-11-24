import { instance } from '../config'

export const fetchNotificationsAPI = async (userId) => {
  try {
    const response = await instance.get(`notification/${userId}`)
    return {
      success: true,
      data: response.data?.data?.items || [],
    }
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return {
      success: false,
      message: 'Failed to fetch notifications.',
    }
  }
}
