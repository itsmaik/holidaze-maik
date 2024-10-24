import { useQuery } from "@tanstack/react-query";
import { fetchVenues } from "@api/services/VenueServices";
import { TVenueList } from "src/types/VenueTypes";
import VenueListTemplate from "../templates/VenueListTemplate";

export default function VenueList() {
  const {
    data: venues,
    error,
    isLoading,
  } = useQuery<TVenueList[]>({
    queryKey: ["venues"],
    queryFn: fetchVenues,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return <p>Error fetching venues: ${error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {venues?.map((venue) => (
        <VenueListTemplate key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
