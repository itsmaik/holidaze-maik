import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { TBooking } from "src/types/bookingTypes";
import { format } from "date-fns";
import Button from "@components/globals/Button";
import toast from "react-hot-toast";
import { deleteVenueService } from "@api/services/VenueServices";

type Props = {
  price: string;
  bookings: TBooking[];
  venueId: string;
};

export default function OwnerBookingCard({ venueId, price, bookings }: Props) {
  const id = venueId;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn: deleteVenueService,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["venues"]})
      toast.success("Venue deleted successfully")
      setTimeout(() => {
        navigate("/")
      }, 2000)
    },
    onError: () => {
      toast.error("Failed to delete venue. Please try again.");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      mutate(id);
    }
  };

  return (
    <div className='rounded-xl shadow-lg bg-white max-w-2xl w-full py-9 sm:px-20 px-10 space-y-7 mx-auto'>
      <strong className='text-gray-700 text-lg block text-left'>
        {price} <span className='font-normal'>per night</span>
      </strong>
      <div className='w-full h-px bg-gray-100' />
      <div className='overflow-y-auto space-y-5 h-64 pb-4 px-5'>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase'>
              <tr>
                <th scope='col' className='py-3'>
                  Customer
                </th>
                <th scope='col' className='py-3 px-5'>
                  Dates
                </th>
                <th scope='col' className='py-3 text-center'>
                  Guests
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking.id} className='bg-white border-b'>
                  <th
                    scope='row'
                    className='py-4 font-medium text-gray-900 whitespace-nowrap'
                  >
                    {booking.customer.name}
                  </th>
                  <td className='py-4 px-5 whitespace-nowrap'>
                    {format(booking.dateFrom, "dd.MM.yy")} -{" "}
                    {format(booking.dateTo, "dd.MM.yy")}
                  </td>
                  <td className='py-4 text-center'>{booking.guests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex items-center justify-end gap-3'>
        <Button type='button' className='w-full'>
          Edit Venue
        </Button>
        <Button type='button' onClick={handleDelete} className='bg-red-50 w-full'>
          Delete Venue
        </Button>
      </div>
    </div>
  );
}
