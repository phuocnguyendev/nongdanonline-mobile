import { AxiosResponse } from 'axios';
import type { ApiResponse, AuthResponse } from '../../types/api.types';
import { instance } from '../config';

export const postRegister = async (data: Record<string, unknown>): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/register', data);
  return response.data;
};

export const postForgotPass = async (data: Record<string, string>): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/forgot-password', data);
  return response.data;
};

export const postLogin = async (data: Record<string, string>): Promise<ApiResponse<AuthResponse>> => {
  const response: AxiosResponse<ApiResponse<AuthResponse>> = await instance.post('/auth/login', data);
  return response.data;
};

export const postLoginGoogle = async (): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/google-login');
  return response.data;
};

export const postLoginApple = async (): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/apple-login');
  return response.data;
};

export const postResetPass = async (data: Record<string, string>): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/reset-password', data);
  return response.data;
};

export const postChangePass = async (data: Record<string, string>): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/change-password', data);
  return response.data;
};

export const postLogout = async (): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/logout');
  return response.data;
};

export const postRefreshToken = async (): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/refresh-token');
  return response.data;
};

export const postVerifyEmail = async (data: Record<string, string>): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/verify-email', data);
  return response.data;
};

export const postResendEmail = async (data: Record<string, string>): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.post('/auth/resend-email', data);
  return response.data;
};
