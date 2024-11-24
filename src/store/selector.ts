import { createSelector } from '@reduxjs/toolkit';
import { OfferData, State } from '../types/types';

export const getOffer = createSelector(
  (state: State) => state['offerPage'],
  (state: OfferData) => state.offer
);

export const getLoadingOfferPage = createSelector(
  (state: State) => state['offerPage'],
  (state: OfferData) => state.offerPageStatus
);
