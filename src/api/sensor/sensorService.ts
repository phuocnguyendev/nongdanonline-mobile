import { VITE_API_SECRETKEY, VITE_API_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js';
import type { SensorData } from '../../types/api.types';

const generateSignature = (secretKey: string, data: string): string => {
  const signature = CryptoJS.HmacSHA256(data, secretKey);
  return CryptoJS.enc.Base64.stringify(signature);
};

const computeContentHash = (content: string): string => {
  const hash = CryptoJS.SHA256(content);
  return CryptoJS.enc.Base64.stringify(hash);
};

const fetchSensorData = async (
  url: string,
  sensorCode: string,
  from: string,
  to: string,
): Promise<SensorData[]> => {
  try {
    const timestamp = new Date().toUTCString();
    const contentHash = computeContentHash('');
    const dataToSign = `${timestamp}\n${contentHash}`;
    const signature = generateSignature(VITE_API_SECRETKEY, dataToSign);

    const headers = {
      'x-ms-date': timestamp,
      'x-ms-content-sha256': contentHash,
      Authorization: `Hmac ${signature}`,
    };

    const response: AxiosResponse<SensorData[]> = await axios.get(url, {
      headers,
      params: {
        sensorCode,
        from,
        to,
      },
    });

    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data: unknown }; message?: string };
    console.error(
      'Error fetching sensor data:',
      axiosError.response?.data || axiosError.message,
    );
    throw error;
  }
};

const fetchCameraData = async (penCode: string): Promise<string> => {
  try {
    const url = `${VITE_API_URL}/api/streams/pens/${penCode}`;
    const timestamp = new Date().toUTCString();
    const contentHash = computeContentHash('');
    const dataToSign = `${timestamp}\n${contentHash}`;
    const signature = generateSignature(VITE_API_SECRETKEY, dataToSign);

    const headers = {
      'x-ms-date': timestamp,
      'x-ms-content-sha256': contentHash,
      Authorization: `Hmac ${signature}`,
    };

    const response: AxiosResponse<string> = await axios.get(url, { headers });

    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data: unknown }; message?: string };
    console.error(
      'Error fetching camera data:',
      axiosError.response?.data || axiosError.message,
    );
    throw error;
  }
};

export { fetchCameraData, fetchSensorData };
