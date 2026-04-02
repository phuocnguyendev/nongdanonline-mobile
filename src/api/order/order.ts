import { AxiosResponse } from 'axios';
import { instance } from '../config';

const getOrderHistory = async (
  userId: string,
  pageIndex?: number,
  pageSize?: number,
  orderStatus?: number,
  startDate?: string,
  endDate?: string,
  orderCode?: string,
): Promise<AxiosResponse> => {
  return await instance.get(`orders/user/${userId}`, {
    params: {
      pageIndex,
      pageSize,
      orderStatus,
      startDate,
      endDate,
      orderCode,
    },
  });
};

export { getOrderHistory };
