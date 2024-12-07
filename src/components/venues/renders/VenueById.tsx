import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ListedBy from "../templates/ListedBy";
import VenueInfo from "../templates/VenueInfo";
import Bookings from "./Bookings";
import { fetchVenueById } from "@api/services/VenueServices";
import { useIsOwner } from "@hooks/useIsOwner";
import placeHolderImage from "src/assets/placeholder-img.avif"

export default function VenueById() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["venue", id],
    queryFn: async () => {
      return fetchVenueById(id ?? "");
    },
  });

  const isOwner = useIsOwner(data?.owner?.email || null);
  if (isLoading) return <p className='text-2xl'>Loading...</p>;

  return (
    <>
      <div className='w-full flex flex-col items-center md:flex-row justify-center gap-16 mb-28'>
        <div className="relative">
          {data && data.media && data.media.length > 0 ? (
            <img
              src={data.media[0].url}
              alt={data.media[0].alt || data.name}
              onError={(e) => (e.target.src = placeHolderImage)}
              className="w-full h-80 object-cover rounded-md"
            />
          ) : (
            <img
              src={placeHolderImage}
              alt={data?.name || "Venue Image"}
              className="min-w-[30rem] h-80 object-cover rounded-md"
            />
          )}

          {data && data.owner && (
            <span className="absolute bottom-2 left-2">
              <ListedBy owner={data.owner.name} price={data.price} />
            </span>
          )}
        </div>
        <VenueInfo
          name={data.name}
          description={data.description}
          location={data.location}
          meta={data.meta}
          rating={data.rating}
        />
      </div>
      <Bookings venueId={data.id} price={data.price} bookings={data.bookings} isOwner={isOwner} />
    </>
  );
}
