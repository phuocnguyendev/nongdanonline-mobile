import { api } from "../config";

export const postForgotPass = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

