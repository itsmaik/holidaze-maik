export default function MyBookingsTable({ bookings }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-lg">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Check-In</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Check-Out</th>
            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-800">{booking.venue.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{booking.dateFrom}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{booking.dateTo}</td>
                <td className="px-4 py-2 text-right text-sm text-gray-800">
                  ${booking.venue.price.toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-2 text-center text-sm text-gray-500"
              >
                No upcoming bookings.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
