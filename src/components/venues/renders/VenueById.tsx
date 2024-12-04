import ListedBy from "../templates/ListedBy";
import VenueInfo from "../templates/VenueInfo";
import Bookings from "./Bookings";
import { useQuery } from "@tanstack/react-query";
import { fetchVenueById } from "@api/services/VenueServices";
import { useParams } from "react-router-dom";
import { useIsOwner } from "@hooks/useIsOwner";

export default function VenueById() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["venue"],
    queryFn: async () => {
      return fetchVenueById(id ?? "");
    },
  });

  const imageSrc = data?.media[0].url;
  const isOwner = useIsOwner(data?.owner.email);

  if (isLoading) return <p className='text-2xl'>Loading...</p>;

  return (
    <>
      <div className='relative flex flex-col items-center lg:items-start lg:flex-row gap-16 w-full mb-28'>
        <div
          className='rounded-2xl max-w-full flex p-3 sm:p-9 w-[619px] min-h-[540px] h-full'
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ListedBy
            owner={data.owner.name}
            price={data.price}
          />
        </div>
        <VenueInfo
          name={data.name}
          description={data.description}
          location={data.location}
          meta={data.meta}
          rating={data.rating}
        />
      </div>
      <Bookings price={data.price} bookings={data.bookings} isOwner={isOwner} />
    </>
  );
}
