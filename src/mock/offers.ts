import { OfferIdDetails } from '../types/types';

export const emptyOffer: OfferIdDetails = {
  id: '0',
  title: '',
  price: 0,
  type: '',
  city: {
    name: '',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  isFavorite: false,
  isPremium: false,
  rating: 0,
  description: '',
  bedrooms: 0,
  goods: [''],
  host: {
    name: '',
    avatarUrl: '',
    isPro: false,
  },
  images: [''],
  maxAdults: 0,
  previewImage: '',

};
