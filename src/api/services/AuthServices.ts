import axiosInstance from "@api/config/axiosInstance";
import { TRegisterProps } from "src/types/registerTypes";

export interface AuthResponse {
  email: string;
  accessToken: string;
  name: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data.data;
};

export const registerUser = async ({
  userData,
}: TRegisterProps): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data.data;
};

export const fetchUserProfile = async (name: string) => {
  const response = await axiosInstance.get(
    `/holidaze/profiles/${name}?_bookings=true&_venues=true`
  );
  return response.data.data;
};

export const updateUserProfile = async (name: string, profileData: any) => {
  const response = await axiosInstance.put(
    `/holidaze/profiles/${name}`,
    profileData
  );
  return response.data;
};
