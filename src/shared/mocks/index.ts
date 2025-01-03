import { AuthorizationStatus } from '../../const';
import { CITYLIST } from '../../mock/cities';
import { emptyOffer } from '../../mock/offers';
import { State } from '../../types/types';

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
    ...initialState,
  };
}
