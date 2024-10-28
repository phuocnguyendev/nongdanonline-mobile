import { api } from "../config";

export const postRegister = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

