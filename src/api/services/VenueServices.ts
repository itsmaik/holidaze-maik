import axiosInstance from "@api/config/axiosInstance";
import type { TVenueList } from "src/types/venueTypes";
import type { TCreateVenueProps } from "src/types/venueFormTypes";

export const fetchVenues = async (): Promise<TVenueList[]> => {
  const response = await axiosInstance.get<{ data: TVenueList[] }>(
    `/holidaze/venues?_active=true&sort=created&sortOrder=desc`
  );
  return response.data.data;
};

export const fetchVenueById = async (id: string) => {
  const response = await axiosInstance.get(
    `/holidaze/venues/${id}?_bookings=true&_owner=true`
  );
  return response.data.data;
};

export const deleteVenueService = async (id: string) => {
  const response = await axiosInstance.delete(
    `/holidaze/venues/${id}`
  );
  return response.data.data;
}

export const createVenueService = async (newVenue: TCreateVenueProps) => {
  const response = await axiosInstance.post("/holidaze/venues", newVenue);
  return response.data.data;
};