import type { NotificationResponse } from '../../types/api.types';
import { instance } from '../config';

export const fetchNotificationsAPI = async (
  userId: string,
): Promise<NotificationResponse> => {
  try {
    const response = await instance.get(`notification/${userId}`);
    return {
      success: true,
      data: response.data?.data?.items || [],
    };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      success: false,
      message: 'Failed to fetch notifications.',
    };
  }
};
