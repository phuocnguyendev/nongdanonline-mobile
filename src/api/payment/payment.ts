import { AxiosResponse } from 'axios';
import type { PaymentData } from '../../types/api.types';
import { instance } from '../config';

export const BuyItem = async (
  paymentData: PaymentData,
  paymentMethod: number,
): Promise<AxiosResponse> => {
  let apiUrl = '';

  switch (paymentMethod) {
    case 0: // VNPay
      apiUrl = 'payment/vnpay/buy-items';
      break;
    case 2: // PayOS
      apiUrl = 'payment/payos/buy-items';
      break;
    default:
      throw new Error('Unsupported payment method');
  }

  return await instance.post(apiUrl, paymentData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
