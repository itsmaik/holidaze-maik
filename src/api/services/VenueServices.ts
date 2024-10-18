import axiosInstance from "../config/axiosInstance";
import { VenueInterface } from "../../types/Venue";

export const VenueServices = {
  fetchVenues: async function (): Promise<VenueInterface[]> {
    const response = await axiosInstance.get<{ data: VenueInterface[] }>(
      "/holidaze/venues"
    );
    return response.data.data;
  },

  fetchVenueById: async function (id: string) {
    const response = await axiosInstance.get(`/holidaze/venues${id}`);
    return response.data;
  },
};
