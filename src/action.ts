import { createAction } from '@reduxjs/toolkit';
import { OfferObject } from './types/types';
export const changeCity = createAction<string>('ChangeCity');

export const AddOffer = createAction<OfferObject[]>('AddOffer');

export const loadOffers = createAction<OfferObject[]>('data/fetchOffers');
