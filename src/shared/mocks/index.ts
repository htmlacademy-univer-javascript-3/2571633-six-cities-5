import { AuthorizationStatus } from '../../const';
import { CITYLIST } from '../../mock/cities';
import { emptyOffer } from '../../mock/offers';
import { RootState } from '../lib/types';

export function makeFakeStore(
  initialState: Partial<RootState> = {}
): RootState {
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
      offer: emptyOffer,
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
        email: '',
        token: '',
      },
      postError: false,
      userDataLoadingStatus: false,
      userEmail: '',
    },
    ...initialState,
  };
}
