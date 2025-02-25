import { format } from "date-fns";

export default function BookingsTableBody({bookings}) {
  return (
    <tbody>
      {bookings.length > 0 ? (
      bookings.map((booking) => (
        <tr key={booking.id} className="border-b">
          <td className="px-4 py-2 text-sm text-gray-800">{booking.customer.name}</td>
          <td className="px-4 py-2 text-sm text-gray-800">{format(booking.dateFrom, "dd.MM.yy")}</td>
          <td className="px-4 py-2 text-sm text-gray-800">{format(booking.dateTo, "dd.MM.yy")}</td>
          <td className="px-4 py-2 text-right text-sm text-gray-800">
            {booking.guests}
          </td>
        </tr>
      ))) : (
        <tr>
          <td
            colSpan={4}
            className="px-4 py-10 text-center text-md text-gray-500"
          >
            No bookings made for this venue.
          </td>
        </tr>
      )}
    </tbody>
  )
}