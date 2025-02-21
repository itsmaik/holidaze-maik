import { useNavigate } from "react-router-dom";

export default function MyVenuesCard({ venue }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${venue.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full max-w-md rounded-lg shadow-lg overflow-hidden cursor-pointer group"
    >
      {/* Venue Image */}
      {venue && venue.media && venue.media.length > 0 ? (
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt || venue.name}
          onError={(e) => (e.target.src = "https://via.placeholder.com/400x300")}
          className="min-w-[30rem] h-80 object-cover rounded-md"
        />
      ) : (
        <img
          src= "https://via.placeholder.com/400x300"
          alt={venue?.name || "Venue Image"}
          className="w-full h-64 object-cover"
        />
      )}

      {/* Listed By */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg">
        <p className="font-semibold">{venue.name}</p>
        <p className="text-sm">For: ${venue.price} per night</p>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300">
        <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100">
          View Venue
        </p>
      </div>
    </div>
  );
}
