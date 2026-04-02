import { AxiosResponse } from 'axios';
import type { ApiResponse, User, UserAddress } from '../../types/api.types';
import { instance } from '../config';

export const getUserInfo = async (userId: string): Promise<ApiResponse<User>> => {
  const response: AxiosResponse<ApiResponse<User>> = await instance.get(`/users/${userId}`);
  return response.data;
};

export const updateUserID = async (
  userId: string,
  data: { name: string; phoneNumber: string },
): Promise<ApiResponse<User>> => {
  const response: AxiosResponse<ApiResponse<User>> = await instance.put(`users/${userId}`, data);
  return response.data;
};

export const uploadUserAvatar = async (
  userId: string,
  formData: FormData,
): Promise<ApiResponse<{ avatar: string }>> => {
  const response = await instance.put(
    `users/${userId}/change-avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const getUserAddress = async (userId: string): Promise<ApiResponse<UserAddress[]>> => {
  const response = await instance.get(`user-address/${userId}`);
  return response.data;
};

export const postUserAddress = async (data: Partial<UserAddress>): Promise<ApiResponse> => {
  const response = await instance.post('user-address', data);
  return response.data;
};

export const updateUserAddress = async (
  id: string,
  data: Partial<UserAddress>,
): Promise<ApiResponse> => {
  const response = await instance.put(`user-address/${id}`, data);
  return response.data;
};

export const deleteUserAddress = async (userAddressId: string): Promise<ApiResponse> => {
  const response = await instance.delete(`user-address/${userAddressId}`);
  return response.data;
};

export const setDefaultAddress = async (addressId: string): Promise<ApiResponse> => {
  const response = await instance.put(`user-address/default/${addressId}`);
  return response.data;
};

export const changeUserPassword = async (
  userId: string,
  data: Record<string, string>,
): Promise<ApiResponse> => {
  const response = await instance.put(`users/${userId}/change-password`, data);
  return response.data;
};
