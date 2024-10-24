import axiosInstance from "@api/config/axiosInstance";

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', {email, password});
  return response.data.data;
};

export const register = async () => {
  const response = await axiosInstance.post('/auth/register');
  return response.data.data;
};