import { createSlice } from '@reduxjs/toolkit';
import { OfferIdDetailsPage } from '../types/types';
import { fetchOffer, loadComments, loadOfferNearby } from '../api-actions';
import { emptyOffer } from '../mock/offers';

const initialState: OfferIdDetailsPage = {
  offer: emptyOffer,
  OfferIdDetailsPageStatus: false,
  nearbyOffers: [],
  comments: [],
};

export const offerPageId = createSlice({
  name: 'offerIdDetails',
  initialState,
  reducers: {
    unmountOfferId: (state) => {
      state.offer = emptyOffer;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.OfferIdDetailsPageStatus = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.OfferIdDetailsPageStatus = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.OfferIdDetailsPageStatus = false;
      })
      .addCase(loadOfferNearby, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(loadComments, (state, action) => {
        state.comments = action.payload;
      });
  },
});
export const { unmountOfferId } = offerPageId.actions;
