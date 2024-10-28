import { api } from "../config";

export const postAddress = async (data) => {
  const response = await api.post("/user-address", data);
  return response.data;
};

