import { useQuery } from "@tanstack/react-query";
import { VenueServices } from "../../api/services/VenueServices";
import { VenueInterface } from "../../types/Venue";
import VenueListTemplate from "./VenueListTemplate";

export default function VenueList() {
  const {
    data: venues,
    error,
    isLoading,
  } = useQuery<VenueInterface[], Error>({
    queryKey: ["venues"],
    queryFn: VenueServices.fetchVenues,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) {
    return <p>Error fetching venues: ${error.message}</p>;
  }

  if (!Array.isArray(venues) || venues.length === 0) {
    return <p>No venues available.</p>;
  }

  console.log(venues);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {venues.map((venue) => (
        <VenueListTemplate key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
