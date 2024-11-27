import { createAction } from '@reduxjs/toolkit';
import { OfferObject, OfferIdDetails } from './types/types';
export const changeCity = createAction<string>('ChangeCity');

export const AddOffer = createAction<OfferObject[]>('AddOffer');

export const loadOffers = createAction<OfferObject[]>('data/fetchOffers');

export const loadOfferDetails = createAction<OfferIdDetails>('data/loadOffer');
