import { Link } from "react-router-dom";
import { TVenueList } from "src/types/venueTypes";
import placeHolderImage from "src/assets/placeholder-img.avif";
import useCurrencyFormatter from "@hooks/useCurrencyFormatter";

type TVenueListProps = {
  venue: TVenueList;
};

export default function VenueListCard({ venue }: TVenueListProps) {
  const formattedPrice = useCurrencyFormatter(venue.price);

  return (
    <div className='bg-stone-50 max-w-sm'>
      <Link to={`/${venue.id}`}>
        <div className='relative'>
          <img
            src={venue.media.length > 0 ? venue.media[0].url : placeHolderImage}
            alt={
              venue.media.length > 0
                ? venue.media[0].alt || venue.name
                : venue.name
            }
            onError={(e) => (e.target.src = placeHolderImage)}
            className='w-80 sm:w-96 h-72 object-cover rounded-md'
          />

          {venue.location && (
            <span className='absolute top-2 right-2 bg-white text-black text-sm font-bold px-2 py-1 rounded-full'>
              {(venue.location.city ||= "oslo")}
            </span>
          )}
        </div>

        {venue.name && (
          <div className='flex flex-col items-start'>
            <p className='font-semibold text-lg'>{venue.name}</p>
            <p className='font-semibold text-gray-700'>
              <span>From</span> {formattedPrice}{" "}
              <span className='font-normal'>per night</span>
            </p>
          </div>
        )}
      </Link>
    </div>
  );
}
