import axiosInstance from "@api/config/axiosInstance";
import { TRegisterProps } from "src/types/registerTypes";

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data.data;
};

export const registerUser = async ({ userData }: TRegisterProps) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data.data;
};
