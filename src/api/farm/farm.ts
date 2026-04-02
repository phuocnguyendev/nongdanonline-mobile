import { AxiosResponse } from 'axios';
import type {
    AddAnimalData,
    Animal,
    ApiResponse,
    Block,
    Farm,
    FarmDetails,
    Package,
} from '../../types/api.types';
import { instance } from '../config';

export const getFarms = async (): Promise<Farm[]> => {
  const response = await instance.get('/farms');
  return response.data?.data || [];
};

export const getFarmDetails = async (farmID: string): Promise<FarmDetails | Record<string, never>> => {
  try {
    const response = await instance.get(`/farms/${farmID}/details`);
    return response.data?.data || {};
  } catch (error) {
    console.error('Error fetching farm details:', error);
    return {};
  }
};

export const getBlocksByFarm = async (
  farmID: string,
  pageIndex: number = 1,
  pageSize: number = 5,
): Promise<Block[]> => {
  const response = await instance.get(`/block-owner-users/${farmID}`, {
    params: { pageIndex, pageSize },
  });
  return response.data.data;
};

export const getMyPackages = async (): Promise<Package[]> => {
  const response = await instance.get('/my-packages');
  return response.data.data || [];
};

export const getFarmAnimal = async (
  farmId: string,
  animalTypeId: string,
): Promise<Animal[]> => {
  try {
    const url = `/animals/farm-animals?farmId=${farmId}&animalTypeId=${animalTypeId}`;
    const response = await instance.get(url);

    if (response?.data?.data) {
      return response.data.data;
    } else {
      console.warn('API returned unexpected structure:', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching animals:', error);
    return [];
  }
};

export const getAnimalPackage = async (animalId: string): Promise<Package[]> => {
  try {
    const response = await instance.get(
      `/my-packages/animal?animalId=${animalId}`,
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching packages for animal:', error);
    return [];
  }
};

export const addAnimalToFarm = async (data: AddAnimalData): Promise<ApiResponse> => {
  try {
    const formattedData = {
      blockOwnerUserID: data.blockOwnerUserID,
      animalId: data.animalId,
      animalName: data.animalName,
      myPackageId: data.myPackageId,
    };

    const response: AxiosResponse<ApiResponse> = await instance.post('/animal-owner-users', formattedData);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data: unknown } };
    if (axiosError.response) {
      console.error('Error adding animal to farm:', axiosError.response.data);
    } else {
      console.error('Error adding animal to farm:', error);
    }
    throw error;
  }
};

export const addPackage = async (data: Record<string, unknown>): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await instance.patch('/user-animal-owner-care', data);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data: unknown } };
    if (axiosError.response) {
      console.error('Error adding package:', axiosError.response.data);
    } else {
      console.error('Error adding package:', error);
    }
    throw error;
  }
};

export const getAnimalDetails = async (
  animalOwnerUserId: string,
): Promise<Record<string, unknown>> => {
  try {
    const response = await instance.get(
      `/block-owner-users/details/${animalOwnerUserId}`,
    );
    return response.data?.data || {};
  } catch (error) {
    console.error('Error fetching animal details:', error);
    return {};
  }
};

export const myFarm = async (data?: Record<string, unknown>): Promise<AxiosResponse> => {
  return await instance.get('/block-owner-users/my-farm', data);
};

export const getAnimalHistory = (userId: string): Promise<AxiosResponse> => {
  return instance.get(`animal-owner-users/get-histories?userId=${userId}`);
};

export const getAnimalHistoryHealth = async (
  animalOwnerUserId: string,
  specificDate: string | null = null,
  startDate: string | null = null,
  endDate: string | null = null,
): Promise<AxiosResponse> => {
  try {
    const params: Record<string, string> = {};

    if (specificDate) {
      params.specificDate = specificDate;
    }
    if (startDate) {
      params.startDate = startDate;
    }
    if (endDate) {
      params.endDate = endDate;
    }

    const response = await instance.get(
      `/animal-raising-history/${animalOwnerUserId}`,
      {
        params,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};
