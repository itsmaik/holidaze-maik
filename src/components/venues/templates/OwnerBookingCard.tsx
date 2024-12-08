import type { TBooking } from "src/types/bookingTypes";
import Button from "@components/globals/Button";
import useDeleteVenue from "../actions/delete-venue/useDelete";
import TableHeader from "@components/profile/TableHeader";
import BookingsTableBody from "@components/profile/BookingsTableBody";

type Props = {
  bookings: TBooking[];
  venueId: string;
};

export default function OwnerBookingCard({ venueId, bookings }: Props) {
  const id = venueId;
  const {deleteVenue} = useDeleteVenue();
  const bookingsHeaders = {
    header1: "Customer",
    header2: "Check-In",
    header3: "Check-out",
    header4: "Guests",
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      deleteVenue(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800">Customers bookings for this venue</h1>
    
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-lg">
          <>
            <TableHeader headers={bookingsHeaders} />
            <BookingsTableBody bookings={bookings} />
          </>
        </table>
      </div>

      <Button onClick={handleDelete} className="mt-10">Delete venue</Button>
    </div>
  );
}
