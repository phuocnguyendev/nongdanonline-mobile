import { AxiosResponse } from 'axios';
import { instance } from '../config';

const getShippingHistory = async (
  userId: string,
  pageIndex?: number,
  pageSize?: number,
  shippingStatus?: number,
  farmID?: string,
  shippingCode?: string,
  shippingDate?: string,
): Promise<AxiosResponse> => {
  return await instance.get(`shipping/user/${userId}`, {
    params: {
      pageIndex,
      pageSize,
      shippingStatus,
      farmID,
      shippingCode,
      shippingDate,
    },
  });
};

export { getShippingHistory };
