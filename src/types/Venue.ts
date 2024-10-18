
export interface Media {
  url: string;
  alt: string;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: 0;
  lng: 0;
}

export interface VenueInterface {
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
}
