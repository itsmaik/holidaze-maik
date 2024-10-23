import { TVenueList } from "../../../types/VenueTypes";
interface VenueListTemplateProps {
  venue: TVenueList;
}

export default function VenueListTemplate({ venue }: VenueListTemplateProps) {
  return (
    <div className="bg-stone-50 max-w-sm">
      <div className="relative">
        {venue.media.length > 0 && (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt}
            className="w-full min-h-72 max-h-72 object-cover rounded-md"
          />
        )}

        <span className="absolute top-2 right-2 bg-white text-black text-sm font-bold px-2 py-1 rounded-full">
          {venue.name}
        </span>
      </div>
    </div>
  );
}
