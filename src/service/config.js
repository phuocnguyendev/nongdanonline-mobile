import axios from "axios";

const BASE_URL = "https://api-nongdan-client.nongdanonline.vn/api/v1/";

export const api = axios.create({
  baseURL: BASE_URL,
});
