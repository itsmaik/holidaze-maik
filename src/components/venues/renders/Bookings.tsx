import useCurrencyFormatter from "@hooks/useCurrencyFormatter";
import BookingCard from "../templates/BookingCard";
import OwnerBookingCard from "../templates/OwnerBookingCard";
import type { TBooking } from "src/types/bookingTypes";

type TBookingsProps = {
  price: number;
  bookings: TBooking[];
  isOwner: boolean;
};

export default function Bookings({ price, bookings, isOwner }: TBookingsProps) {
  const formattedPrice = useCurrencyFormatter(price);
  return (
    <>
      {isOwner ? (
        <OwnerBookingCard bookings={bookings} price={formattedPrice} />
      ) : (
        <BookingCard price={formattedPrice} />
      )}
    </>
  );
}
