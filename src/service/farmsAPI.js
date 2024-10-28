import { api } from "./config";

export const getFarms = async () => {
  const response = await api.get("/farms");
  return response.data;
};

