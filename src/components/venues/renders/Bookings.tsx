import useCurrencyFormatter from "@hooks/useCurrencyFormatter";
import BookingCard from "../templates/BookingCard";
import OwnerBookingCard from "../templates/OwnerBookingCard";
import type { TBooking } from "src/types/bookingTypes";

type TBookingsProps = {
  price: number;
  bookings: TBooking[];
  isOwner: boolean;
  venueId: string;
};

export default function Bookings({ price, bookings, isOwner, venueId }: TBookingsProps) {
  const formattedPrice = useCurrencyFormatter(price);
  return (
    <>
      {isOwner ? (
        <OwnerBookingCard venueId={venueId} bookings={bookings} price={formattedPrice} />
      ) : (
        <BookingCard price={formattedPrice} />
      )}
    </>
  );
}
