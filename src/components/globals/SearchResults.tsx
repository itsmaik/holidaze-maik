import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import VenueListCard from "@components/venues/templates/VenueListCard";
import { TVenueList } from "src/types/venueTypes";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const cachedVenues = queryClient.getQueryData<TVenueList[]>(["venues"]);

  const filteredVenues = cachedVenues?.filter((venue) => {
    const matchesLocation = searchParams.get("location")
      ? venue.location.city
          .toLowerCase()
          .includes(searchParams.get("location")!.toLowerCase())
      : true;

    const matchesCheckIn = searchParams.get("checkIn")
      ? new Date(searchParams.get("checkIn")!) >= new Date(venue.availableFrom)
      : true;

    const matchesCheckOut = searchParams.get("checkOut")
      ? new Date(searchParams.get("checkOut")!) <=
        new Date(venue.availableUntil)
      : true;

    const matchesGuests = searchParams.get("guests")
      ? parseInt(searchParams.get("guests")!, 10) <= venue.maxGuests
      : true;

    return (
      matchesLocation && matchesCheckIn && matchesCheckOut && matchesGuests
    );
  });

  return (
    <>
      <section className='container mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>Search Results</h1>
        {filteredVenues && filteredVenues.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center'>
            {filteredVenues.map((venue) => (
              <VenueListCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </section>
    </>
  );
}
