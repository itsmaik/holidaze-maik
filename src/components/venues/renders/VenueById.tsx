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
      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 space-y-12">
        {/* Venue Content Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Image Section */}
          <div className="relative w-full lg:w-2/5">
            {data && data.media && data.media.length > 0 ? (
              <img
                src={data.media[0].url}
                alt={data.media[0].alt || data.name}
                onError={(e) => (e.target.src = placeHolderImage)}
                className="w-full h-96 object-cover rounded-md shadow-lg"
              />
            ) : (
              <img
                src={placeHolderImage}
                alt={data?.name || "Venue Image"}
                className="w-full h-96 object-cover rounded-md shadow-lg"
              />
            )}
  
            {/* Listed By Section */}
            {data && data.owner && (
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 px-4 py-2 rounded-md shadow-md">
                <ListedBy owner={data.owner.name} price={data.price} />
              </div>
            )}
          </div>
  
          {/* Venue Info Section */}
          <div className="w-full lg:w-3/5">
            <VenueInfo
              name={data.name}
              description={data.description}
              location={data.location}
              meta={data.meta}
              rating={data.rating}
            />
          </div>
        </div>
  
        {/* Bookings Section */}
        <div>
          <Bookings
            venue={data}
            venueId={data.id}
            price={data.price}
            bookings={data.bookings}
            isOwner={isOwner}
          />
        </div>
      </div>
    </>
  );  
  
}
