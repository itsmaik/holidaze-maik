import { createBooking } from "@api/services/BookingServices";
import Button from "@components/globals/Button";
import Modal from "@components/globals/Modal";
import CalendarModal from "./CalendarModal";
import GuestSelectorModal from "./GuestSelectorModal";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@hooks/useAuth";
import Login from "@components/auth/login/Login";
import BookingAction from "./BookingActions";

type ValuePiece = Date | null;
type Props = {
  price: string;
  venueId: string;
};

export default function BookingCard({ price, venueId }: Props) {
  const [checkInDate, setCheckInDate] = useState<ValuePiece>(null);
  const [checkOutDate, setCheckOutDate] = useState<ValuePiece>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const today = new Date();

  const { mutate } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      resetForm();
      toast.success("Your booking was successful!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error?.response.data.errors[0]?.message || "Booking failed. Please try again.");
    },
  });

  const resetForm = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setAdults(1);
    setChildren(0);
  };

  const handleBooking = () => {
    mutate({
      dateFrom: checkInDate?.toISOString() || "",
      dateTo: checkOutDate?.toISOString() || "",
      guests: adults + children,
      venueId,
    });
  };

  return (
    <>
      <div className="rounded-xl shadow-lg bg-white max-w-5xl w-full py-9 px-20 space-y-7 mx-auto">
        <strong className="text-gray-700 text-lg block text-left">
          {price} <span className="font-normal">per night</span>
        </strong>
        <div className="w-full h-px bg-gray-100" />
        <div className="flex sm:items-center sm:justify-between sm:text-left sm:flex-row flex-col">
          <BookingAction
            title="Check In"
            onClick={() => setModalOpen("check-in")}
            displayValue={checkInDate ? checkInDate.toLocaleDateString() : undefined}
          />
          <BookingAction
            title="Check Out"
            onClick={() => setModalOpen("check-out")}
            displayValue={checkOutDate ? checkOutDate.toLocaleDateString() : undefined}
            hasLine
          />
          <BookingAction
            title="Guests"
            onClick={() => setModalOpen("guests")}
            displayValue={`${adults} adults, ${children} children`}
            hasLine
          />
        </div>
        {isLoggedIn ? (
          <Button className="!bg-gray-700 text-white w-full" onClick={handleBooking}>
            Reserve Now
          </Button>
        ) : (
          <Button className="!bg-gray-700 text-white w-full" onClick={() => setLoginOpen(true)}>
            Login to proceed
          </Button>
        )}
      </div>
      {/* Modals */}
      <CalendarModal
        isOpen={modalOpen === "check-in"}
        title="Select a check in date"
        value={checkInDate || today}
        minDate={today}
        onClose={() => setModalOpen(null)}
        onChange={(value) => {
          setCheckInDate(value);
          setModalOpen(null);
          if (checkOutDate && value >= checkOutDate) setCheckOutDate(null);
        }}
      />
      <CalendarModal
        isOpen={modalOpen === "check-out"}
        title="Select a check out date"
        value={checkOutDate || (checkInDate ? new Date(checkInDate) : today)}
        minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : today}
        onClose={() => setModalOpen(null)}
        onChange={(value) => {
          setCheckOutDate(value);
          setModalOpen(null);
        }}
      />
      <GuestSelectorModal
        isOpen={modalOpen === "guests"}
        adults={adults}
        children={children}
        onAdultsChange={setAdults}
        onChildrenChange={setChildren}
        onClose={() => setModalOpen(null)}
      />
      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} title="Login with an existing account">
        <Login onSuccess={() => setLoginOpen(false)} />
      </Modal>
    </>
  );
}
