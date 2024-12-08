import useCurrencyFormatter from "@hooks/useCurrencyFormatter";
import BookingCard from "../templates/BookingCard";
import OwnerBookingCard from "../templates/OwnerBookingCard";
import type { TBooking } from "src/types/bookingTypes";
import { TEditVenueProps } from "src/types/editVenueTypes";

type TBookingsProps = {
  price: number;
  bookings: TBooking[];
  isOwner: boolean;
  venueId: string;
  venue: TEditVenueProps;
};

export default function Bookings({venue, price, bookings, isOwner, venueId }: TBookingsProps) {
  const formattedPrice = useCurrencyFormatter(price);
  return (
    <>
      {isOwner ? (
        <OwnerBookingCard venue={venue} venueId={venueId} bookings={bookings} />
      ) : (
        <BookingCard price={formattedPrice} venueId={venueId} />
      )}
    </>
  );
}
