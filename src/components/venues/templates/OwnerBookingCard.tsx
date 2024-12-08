import type { TBooking } from "src/types/bookingTypes";
import Button from "@components/globals/Button";
import useDeleteVenue from "../actions/delete-venue/useDelete";
import TableHeader from "@components/profile/TableHeader";
import BookingsTableBody from "@components/profile/BookingsTableBody";
import { bookingsHeaders } from "@utils/functions/bookingHeaders";
import EditVenueModal from "../actions/edit-venue/EditVenueModal";
import { TEditVenueProps } from "src/types/editVenueTypes";

type Props = {
  bookings: TBooking[];
  venueId: string;
  venue: TEditVenueProps;
};

export default function OwnerBookingCard({ venue, venueId, bookings }: Props) {
  // const id = venueId;
  const {deleteVenue} = useDeleteVenue();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      deleteVenue(venueId);
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
      <div className="flex flex-row mt-10 justify-center gap-8">
        <Button onClick={handleDelete}>Delete venue</Button>
        <EditVenueModal venue={venue}  />
        </div>
      </div>
  );
}
