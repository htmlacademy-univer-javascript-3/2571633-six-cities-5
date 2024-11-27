import { createSlice } from '@reduxjs/toolkit';
import { OfferData } from '../types/types';
import { fetchOfferObjectAction } from '../api-actions';

const initialState: OfferData = {
  offer: [],
  offerPageStatus: false,
};
export const offerPage = createSlice({
  name: 'offerPage',
  initialState,
  reducers: {
    unmountOffer: (state) => {
      state.offer = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferObjectAction.pending, (state) => {
        state.offerPageStatus = true;
      })
      .addCase(fetchOfferObjectAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.offerPageStatus = false;
      })
      .addCase(fetchOfferObjectAction.rejected, (state) => {
        state.offerPageStatus = false;
      });
  },
});

export const { unmountOffer } = offerPage.actions;
