import { render } from '@testing-library/react';

import Map from './Map';
import {OfferIdDetails } from '../../types/types.ts';

it('Map correctly renders', () => {
  const mockCity = {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
  };

  const mockPlaces: OfferIdDetails[] = [
    {
      id: '1',
      title: 'Place 1',
      type: 'apartment',
      price: 100,
      location: { latitude: 48.857, longitude: 2.354, zoom: 10 },
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
      city: mockCity,
      description: '',
      bedrooms: 0,
      goods: [''],
      host: {
        name: '',
        avatarUrl: '',
        isPro: false
      },
      images: [''],
      maxAdults: 0,
      previewImage: ''
    },
    {
      id: '2',
      title: 'Place 2',
      type: 'house',
      price: 200,
      location: { latitude: 48.858, longitude: 2.355, zoom: 10 },
      isFavorite: true,
      isPremium: false,
      rating: 4.0,
      city: mockCity,
      description: '',
      bedrooms: 0,
      goods: [''],
      host: {
        name: '',
        avatarUrl: '',
        isPro: false
      },
      images: [''],
      maxAdults: 0,
      previewImage: ''
    },
  ];

  const tree = render(<Map offers={mockPlaces} currentCity={{ title: 'Paris',lat: 48.8566, lng: 2.3522}} selectedPoint={undefined} activeOffer={null}/>);

  expect(tree).toMatchSnapshot();
});
