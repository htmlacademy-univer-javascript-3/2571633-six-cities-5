import { AuthEnum } from '../../entities/user';
import { SortingOptionsEnum } from '../../features/sorting-panel';
import { Cities } from '../api';
import { RootState } from '../lib/types';
import { PlaceType } from '../types';

export function makeFakeStore(initialState:Partial<RootState> = {}): RootState {
  return {
    offer: {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: {
        'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        'title': 'Wood and stone place',
        'type': 'apartment' as PlaceType,
        'price': 576,
        'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'city': {
          'name': Cities.Amsterdam,
          'location': {
            'latitude': 48.85661,
            'longitude': 2.351499,
            'zoom': 13
          }
        },
        'location': {
          'latitude': 48.868610000000004,
          'longitude': 2.342499,
          'zoom': 16
        },
        'isFavorite': false,
        'isPremium': false,
        'rating': 2.1,
        'description': 'TEst',
        'bedrooms': 1,
        'goods': [],
        maxAdults: 1,
        images: [''],
        host:{ 'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        }
      },
      favorites: [{
        'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        'title': 'Wood and stone place',
        'type': 'apartment' as PlaceType,
        'price': 576,
        'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'city': {
          'name': Cities.Amsterdam,
          'location': {
            'latitude': 48.85661,
            'longitude': 2.351499,
            'zoom': 13
          }
        },
        'location': {
          'latitude': 48.868610000000004,
          'longitude': 2.342499,
          'zoom': 16
        },
        'isFavorite': false,
        'isPremium': false,
        'rating': 2.1,
        'description': 'TEst',
        'bedrooms': 1,
        'goods': [],
        maxAdults: 1,
        images: [''],
        host:{ 'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        }
      }],
    },
    review: {
      reviews: [ {
        'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        'date': '2019-05-08T14:13:56.569Z',
        'user': {
          'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        },
        'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        'rating': 4
      }
      ],
      isLoading: false,
      isError: false
    },
    user: {
      authorizationStatus: AuthEnum.AUTHENTICATED,
      user: {
        name: 'Oliver Conner',
        avatarUrl: 'https://url-to-image/image.png',
        isPro: false
      }
    },
    ...initialState
  };
}
