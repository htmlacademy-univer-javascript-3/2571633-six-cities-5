import { Cities } from '../api';

export type PlaceType = 'room' | 'apartment' | 'house' | 'hotel';
export type OfferType = {
  id: string;
  title: string;
  type: PlaceType;
  price: number;
  previewImage: string;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostType;
  images: string[];
  maxAdults: number;
}

export type CityType = {
    name: Cities;
    location: LocationType;
}

export type HostType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type LocationType = {
    latitude: number;
    longitude: number;
    zoom: number;
}

export type Token = string;

export type ErrorMessageType = {
  type: string;
  message: string;
}
