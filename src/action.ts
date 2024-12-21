import { createAction } from '@reduxjs/toolkit';
import { OfferObject, OfferIdDetails, AppRoute } from './types/types';
export const changeCity = createAction<string>('ChangeCity');

export const AddOffer = createAction<OfferObject[]>('AddOffer');

export const loadOffers = createAction<OfferObject[]>('data/fetchOffers');

export const loadOfferDetails = createAction<OfferIdDetails>('data/loadOffer');

export const setOffer = createAction<OfferIdDetails>('offer/set');
export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
