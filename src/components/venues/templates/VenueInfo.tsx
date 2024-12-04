import StarComponent from "@components/globals/StarComponent";
import { SuccessIcon, XIcon } from "@components/svg/svg";
import type { TLocation } from "src/types/venueTypes";

type Meta = {
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
  wifi: boolean;
};

type Props = {
  name: string;
  description: string;
  rating: number;
  location: TLocation;
  meta: Meta;
};

const Amenity = ({
  hasAmenity = false,
  title,
}: {
  hasAmenity?: boolean;
  title: string;
}) => (
  <div className='flex items-center gap-3'>
    {hasAmenity ? <SuccessIcon /> : <XIcon />}
    <span className='text-gray-700 text-base font-medium'>{title}</span>
  </div>
);

export default function VenueInfo({
  location,
  name,
  rating,
  description,
  meta,
}: Props) {
  return (
    <div className='space-y-9'>
      <div className='flex items-start gap-8 flex-col xl:flex-row'>
        <div className='flex flex-col items-start'>
          <h1 className='text-gray-700 text-2xl font-bold'>{name}</h1>
          <span className='text-2x text-gray-500'>
            {location.address} {location.city} {location.country}
          </span>
        </div>
        <StarComponent rating={rating} />
      </div>
      <div className='flex flex-col items-start gap-2.5'>
        <strong className='text-gray-700 font-bold text-xl'>
          Apartment Description
        </strong>
        <span className='text-gray-500 text-base block text-left max-w-prose'>
          {description}
        </span>
      </div>
      <div className='flex flex-col items-start gap-2.5'>
        <strong className='text-gray-700 font-bold text-xl'>
          Offered Amenities
        </strong>
        <div className='grid grid-cols-1 gap-y-5 gap-x-20 mt-3.5 xl:grid-cols-2'>
          <Amenity title='Breakfast' hasAmenity={meta.breakfast} />
          <Amenity title='Parking' hasAmenity={meta.parking} />
          <Amenity title='Pets' hasAmenity={meta.pets} />
          <Amenity title='Wi-fi' hasAmenity={meta.wifi} />
        </div>
      </div>
    </div>
  );
}
