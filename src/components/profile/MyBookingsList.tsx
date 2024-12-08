import MyBookingsTable from "./MyBookingsTable";

export default function MyBookingsList({bookings, headers}) {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h1>
      <MyBookingsTable bookings={bookings} headers={headers}/>
    </div>
  );
}