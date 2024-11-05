import { useQuery } from "@tanstack/react-query";
import { fetchVenues } from "@api/services/VenueServices";
import { TVenueList } from "src/types/venueTypes";
import VenueListCard from "../templates/VenueListCard";
import toast from "react-hot-toast";

export default function VenueList() {
  const {
    data: venues,
    error,
    isLoading,
  } = useQuery<TVenueList[]>({
    queryKey: ["venues"],
    queryFn: fetchVenues,
  });

  if (isLoading) return <p className="text-2xl">Loading...</p>;
  if (error) {
    return toast.error(`Error fetching venues: ${error.message}`);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {venues?.map((venue) => (
        <VenueListCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
