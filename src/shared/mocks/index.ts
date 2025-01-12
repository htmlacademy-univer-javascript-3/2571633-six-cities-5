import { AuthorizationStatus } from '../../const';
import { CITYLIST } from '../../mock/cities';
import { emptyOffer } from '../../mock/offers';
import { State } from '../../types/types';
import { TRootReducer } from '../../reducer';
export function makeFakeStore(initialState: Partial<State> = {}): State {
  return {
    Cities: {
      currentCity: CITYLIST[0],
      cities: CITYLIST,
      offers: [],
      offerIdDetails: emptyOffer,
    },
    offerPage: {
      offer: [],
      offerPageStatus: false,
    },
    offerIdDetails: {
      offer: {
        id: 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        title: 'Wood and stone place',
        type: 'apartment',
        price: 576,
        images: ['https://14.design.htmlacademy.pro/static/hotel/14.jpg'],

        previewImage: 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',

        city: {
          name: 'Amsterdam',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13,
          },
        },
        location: {
          latitude: 48.868610000000004,
          longitude: 2.342499,
          zoom: 16,
        },
        isFavorite: false,
        isPremium: false,
        rating: 2.1,
        description: 'dsf',
        bedrooms: 1,
        goods: [''],
        maxAdults: 1,
        host: {
          name: 'Oliver Conner',
          avatarUrl: 'https://url-to-image/image.png',
          isPro: false,
        },
      },
      OfferIdDetailsPageStatus: false,
      nearbyOffers: [],
      comments: [],
    },
    currentCity: {
      currentCity: CITYLIST[0],
      cities: CITYLIST,
      offers: [],
      offerIdDetails: emptyOffer,
    },
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {
        name: 'Oliver Conner',
        avatarUrl: 'https://url-to-image/image.png',
        isPro: false,

        email: 'test@gmail.com',
        token: '',
      },
      userEmail: 'test@gmail.com',
      userDataLoadingStatus: true,
      postError: false,

    },
    Favorites: {
      favorites: [],
      isFavoritesDataLoading: 'Success',
    },
    ...initialState,
  };
}

export const mockState: TRootReducer = {
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {
      name: 'John Doe',
      avatarUrl: '/img/avatar.jpg',
      isPro: false,
      email: 'john.doe@example.com',
      token: 'token123',
    },
    postError: false,
    userDataLoadingStatus: false,
    userEmail: '',
  },
  Cities: {
    currentCity: {
      title: '',
      lat: 0,
      lng: 0,
    },
    cities: [],
    offers: [],
    offerIdDetails: {
      id: '',
      title: '',
      type: '',
      price: 0,
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
    },
  },
  currentCity: {
    currentCity: {
      title: 'Paris',
      lat: 48.8566,
      lng: 2.3522,
    },
    cities: [],
    offers: [],
    offerIdDetails: {
      id: '',
      title: '',
      type: '',
      price: 0,
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
    },
  },
  offerPage: {
    offer: [],
    offerPageStatus: false,
  },
  offerIdDetails: {
    offer: {
      id: '1',
      title: 'Test offer',
      type: 'apartment',
      price: 100,
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
      city: {
        name: 'Paris',
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 0,
        },
      },
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 0,
      },
      description: 'description',
      bedrooms: 2,
      goods: ['window'],
      host: {
        name: 'Aba',
        avatarUrl: 'img/src1.jpg',
        isPro: false,
      },
      images: ['img/src1.jpg'],
      maxAdults: 2,
      previewImage: '',
    },
    OfferIdDetailsPageStatus: false,
    nearbyOffers: [],
    comments: [],
  },
  Favorites: {
    favorites: [],
    isFavoritesDataLoading: 'Success',
  },
};
