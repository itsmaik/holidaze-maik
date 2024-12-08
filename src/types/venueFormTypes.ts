type Media = {
  url: string;
  alt: string;
};

export type TCreateVenueFormInput = {
  name: string;
  description: string;
  city: string;
  media: Media[];
  country: string;
  price: number;
  maxGuests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

export type TCreateVenueProps = {
  newVenue: TCreateVenueFormInput;
};
