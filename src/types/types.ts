import { store } from '../store';
import { AuthorizationStatus } from '../const';
export type City = {
  title: string;
  lat: number;
  lng: number;
};
export type OfferData = {
  offer: OfferObject[];
  offerPageStatus: boolean;
};
export type OfferIdDetailsPage = {
  offer: OfferIdDetails;
  OfferIdDetailsPageStatus: boolean;
  nearbyOffers: OfferObject[];
  comments: UserReview[];
};
export type OfferIdDetails = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: [string];
  maxAdults: number;
};
export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export interface EmptyCityProps {
  city: Cities;
}

export type AuthorizationSlice = {
  authorizationStatus: AuthorizationStatus;
  userData: UserAuth | null;
  postError: boolean;
  userDataLoadingStatus: boolean;
  userEmail: string;
};
export type Point = {
  title: string;
  lat: number;
  lng: number;
};
export type OfferObject = {
  id: string;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  isFavorite: boolean;
  NumberOfPlaces: number;
  previewImage: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};
export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer/:id',
}

export const enum CardCssNameList {
  citiesList = 'cities__card',
  neardPlace = 'near-places__card',
  favoritePlace = 'favorites__card',
}

export type UserReview = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
};
export type UserReviewPost = {
  rating: number;
  comment: string;
  id: string;
};
export type UserObject = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};
export const enum SortName {
  popular = 'popular',
  lowToHigh = 'lowToHigh',
  highToLow = 'highToLow',
  topRated = 'topRated',
}

export type UserAuth = UserObject & {
  email: string;
  token: string;
};

export type LoginAuth = {
  email: string;
  password: string;
};
export type ReducerType = {
  offer: OfferIdDetailsPage;
  user: UserAuth;
  review: UserReview;
};
export type Points = Point[];
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
