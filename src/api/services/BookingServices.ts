import axiosInstance from "@api/config/axiosInstance";
import type { TBooking } from "src/types/bookingTypes";

export const createBooking = async (
  data: Partial<TBooking>
): Promise<TBooking[]> => {
  const response = await axiosInstance.post("/holidaze/bookings", {
    ...data,
  });
  return response.data.data;
};
