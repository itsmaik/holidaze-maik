type Media = {
  url: string;
  alt: string;
};

export type Location = {
  city: string;
  country: string;
};

export type Meta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export type TEditVenueProps = {
  name: string;
  description: string;
  location: Location;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  meta: Meta;
};