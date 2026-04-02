import axios, { AxiosRequestConfig } from 'axios';

const getAddress = async (data?: AxiosRequestConfig): Promise<unknown> => {
  return await axios.get(
    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
    data,
  );
};

export { getAddress };
