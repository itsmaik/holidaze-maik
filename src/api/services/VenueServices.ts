import axiosInstance from "@api/config/axiosInstance";
import { TVenueList } from "../../types/VenueTypes";

export const VenueServices = {
  fetchVenues: async function (): Promise<TVenueList[]> {
    const response = await axiosInstance.get<{ data: TVenueList[] }>(
      "/holidaze/venues"
    );
    return response.data.data;
  },

  fetchVenueById: async function (id: string) {
    const response = await axiosInstance.get(`/holidaze/venues${id}`);
    return response.data.data;
  },
};
