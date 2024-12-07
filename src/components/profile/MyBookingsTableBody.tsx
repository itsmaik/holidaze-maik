import { format } from "date-fns";

export default function MyBookingsTableBody({bookings}) {
  return (
    <tbody>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <tr key={booking.id} className="border-b">
            <td className="px-4 py-2 text-sm text-gray-800">{booking.venue.name}</td>
            <td className="px-4 py-2 text-sm text-gray-800">{format(booking.dateFrom, "dd.MM.yy")}</td>
            <td className="px-4 py-2 text-sm text-gray-800">{format(booking.dateTo, "dd.MM.yy")}</td>
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
  )
}