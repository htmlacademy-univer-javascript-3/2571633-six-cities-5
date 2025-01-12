import { createAction } from '@reduxjs/toolkit';

import {
  OfferObject,
  OfferIdDetails,
  AppRoute,
  UserAuth,
  favoriteObject,
} from './types/types';
import { APIRoute, AuthorizationStatus } from './const';
export const changeCity = createAction<string>('ChangeCity');
export const changeAuthStatus = createAction<AuthorizationStatus>(
  'user/changeAuthStatus'
);
export const setUser = createAction<UserAuth | null>('user/setUser');

export const AddOffer = createAction<OfferObject[]>('AddOffer');

export const loadOffers = createAction<OfferObject[]>('data/fetchOffers');

export const loadOfferDetails = createAction<OfferIdDetails>('data/loadOffer');

export const setOffer = createAction<OfferIdDetails>('offer/set');
export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');

export const setFavoritesLoadingStatus = createAction<string>(
  `${APIRoute.Favorites}/loading`
);

export const setFavorites = createAction<favoriteObject[]>(
  `${APIRoute.Favorites}/set`
);
