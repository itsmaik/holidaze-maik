import axiosInstance from "@api/config/axiosInstance";
import type { TVenueList } from "src/types/venueTypes";

export const fetchVenues = async (): Promise<TVenueList[]> => {
  const response = await axiosInstance.get<{ data: TVenueList[] }>(
    "/holidaze/venues"
  );
  return response.data.data;
};

export const fetchVenueById = async (id: string) => {
  const response = await axiosInstance.get(
    `/holidaze/venues/${id}?_bookings=true&_owner=true`
  );
  return response.data.data;
};
