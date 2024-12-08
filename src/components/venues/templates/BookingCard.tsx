import { createBooking } from "@api/services/BookingServices";
import Button from "@components/globals/Button";
import Modal from "@components/globals/Modal";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Calendar from "react-calendar";
import { FaMinus, FaPlus } from "react-icons/fa";
import type { TBooking } from "src/types/bookingTypes";
import toast from "react-hot-toast";
import { useAuth } from "@hooks/useAuth";
import Login from "@components/auth/login/Login";

type ValuePiece = Date | null;
type Props = {
  price: string;
  venueId:string;
};

const BookingAction = ({
  title,
  action,
  hasLine = false,
  displayValue,
}: {
  title: string;
  action: () => void;
  hasLine?: boolean;
  displayValue?: string;
}) => (
  <div className='flex flex-col gap-1 relative'>
    {hasLine && <div className='h-px w-full bg-gray-100 sm:hidden my-5' />}
    <strong className='text-xs block'>{title}</strong>
    <Button
      type='button'
      className='border-0 text-gray-300 text-sm w-fit !p-0 mx-auto sm:mx-0'
      onClick={action}
    >
      {displayValue || (title === "Guests" ? "Add Guests" : "Add Dates")}
    </Button>
    {hasLine && (
      <div className='w-px h-9 bg-gray-100 absolute -left-6 sm:block hidden' />
    )}
  </div>
);

export default function BookingCard({ price, venueId }: Props ) {
  const [checkInDate, setCheckInDate] = useState<ValuePiece>(null);
  const [checkOutDate, setCheckOutDate] = useState<ValuePiece>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [modalOpen, setModalOpen] = useState("");
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const today = new Date();
  const { mutate } = useMutation({
    mutationFn: (data: Partial<TBooking>) => {
      return createBooking(data);
    },
    onSuccess: () => {
      setCheckInDate(null);
      setCheckOutDate(null);
      setAdults(1);
      setChildren(0);
      toast.success("You booking was successful")
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response.data.errors[0].message);
    },
  });
  
  return (
    <>
      <div className='rounded-xl shadow-lg bg-white max-w-5xl w-full py-9 px-20 space-y-7 mx-auto'>
        <strong className='text-gray-700 text-lg block text-left'>
          {price} <span className='font-normal'>per night</span>
        </strong>
        <div className='w-full h-px bg-gray-100' />
        <div className='flex sm:items-center sm:justify-between sm:text-left sm:flex-row flex-col'>
          <BookingAction
            title='Check In'
            action={() => {
              setModalOpen("check-in");
            }}
            displayValue={
              checkInDate ? checkInDate.toLocaleDateString() : undefined
            }
          />
          <BookingAction
            title='Check Out'
            action={() => {
              setModalOpen("check-out");
            }}
            hasLine
            displayValue={
              checkOutDate ? checkOutDate.toLocaleDateString() : undefined
            }
          />
          <BookingAction
            title='Guests'
            action={() => {
              setModalOpen("guests");
            }}
            hasLine
            displayValue={`${adults} adults, ${children} children`}
          />
        </div>
        {isLoggedIn ? ( 
          <Button
            className='!bg-gray-700 text-white w-full'
            onClick={() =>
              mutate({
                dateFrom: checkInDate?.toISOString() || "",
                dateTo: checkOutDate?.toISOString() || "",
                guests: adults + children,
                venueId: venueId ?? "",
              })
            }
          >
            Reserve Now
          </Button>
          ) : (
          <Button className="!bg-gray-700 text-white w-full"
          onClick={() => setLoginOpen(true)}>Login to proceed</Button>
        )}
      </div>
      {/* Check-in Modal */}
      <Modal
        isOpen={modalOpen === "check-in"}
        title='Select a check in date'
        onClose={() => setModalOpen("")}
      >
        <div className='flex items-center justify-center'>
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                setCheckInDate(value);
                setModalOpen("");
                if (checkOutDate && value >= checkOutDate) {
                  setCheckOutDate(null);
                }
              }
            }}
            value={checkInDate || today}
            locale='no-NO'
            minDate={today}
          />
        </div>
      </Modal>
      {/* Check-out Modal */}
      <Modal
        isOpen={modalOpen === "check-out"}
        title='Select a check out date'
        onClose={() => setModalOpen("")}
      >
        <div className='flex items-center justify-center'>
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                setCheckOutDate(value);
                setModalOpen("");
              }
            }}
            value={
              checkOutDate || (checkInDate ? new Date(checkInDate) : today)
            }
            locale='no-NO'
            minDate={
              checkInDate ? new Date(checkInDate.getTime() + 86400000) : today
            }
          />
        </div>
      </Modal>
      {/* Guests Modal */}
      <Modal
        isOpen={modalOpen === "guests"}
        title='Add how many guests'
        onClose={() => setModalOpen("")}
      >
        <div className='flex items-center justify-center flex-col gap-5'>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              disabled={adults <= 1}
            >
              <FaMinus />
            </Button>
            <span>Adults {adults}</span>
            <Button onClick={() => setAdults(adults + 1)}>
              <FaPlus />
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => setChildren(Math.max(0, children - 1))}
              disabled={children <= 0}
            >
              <FaMinus />
            </Button>
            <span>Children {children}</span>
            <Button onClick={() => setChildren(children + 1)}>
              <FaPlus />
            </Button>
          </div>
          <Button
            className='w-full !bg-gray-700 text-white'
            onClick={() => setModalOpen("")}
          >
            Add guests
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        title='Login with an existing account'
      >
        <Login onSuccess={() => setLoginOpen(false)} />
        </Modal>
    </>
  );
}
