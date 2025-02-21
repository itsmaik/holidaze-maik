import TableHeader from "../globals/TableHeader";
import MyBookingsTableBody from "./MyBookingsTableBody";

export default function MyBookingsTable({ headers, bookings }) {
  return (
    <div className='overflow-x-auto mt-6'>
      <table className='min-w-full border border-gray-200 bg-white rounded-lg shadow-lg'>
        <>
          <TableHeader headers={headers} />
          <MyBookingsTableBody bookings={bookings} />
        </>
      </table>
    </div>
  );
}
