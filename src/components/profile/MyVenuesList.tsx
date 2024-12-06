import MyVenuesCard from "./MyVenuesCard";

export default function MyVenuesList({ venues }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <MyVenuesCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
