
export type Media = {
  url: string;
  alt: string;
};

export type TLocation = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: 0;
  lng: 0;
};

export type TVenue = {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rated: number;
  created: string;
  updated: string;
  meta: object;
  location: Location;
};

export type TVenueList = {
  id: string;
  name: string;
  description: string;
  media: Media[];
};
