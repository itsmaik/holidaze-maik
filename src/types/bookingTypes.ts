export type TBooking = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
  customer: {
    name: string;
  };
};
