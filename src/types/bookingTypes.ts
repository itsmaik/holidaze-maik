export type TBooking = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  id: string;
  customer: {
    name: string;
  };
};
