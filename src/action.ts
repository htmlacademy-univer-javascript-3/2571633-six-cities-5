import { createAction } from '@reduxjs/toolkit';

import { OfferObject, OfferIdDetails, AppRoute, UserAuth } from './types/types';
import { AuthorizationStatus } from './const';
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
