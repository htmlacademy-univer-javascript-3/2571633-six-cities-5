import { createReducer } from '@reduxjs/toolkit';
import { City, OfferObject } from './types/types';
import { changeCity, AddOffer } from './action';
import { CITYLIST } from './mock/cities';
import { offers } from './mock/offers';
type InitialState = {
  currentCity: City;
  cities: City[];
  offers: OfferObject[];
};

const initialState: InitialState = {
  currentCity: CITYLIST[0],
  cities: CITYLIST,
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = state.cities.find(
        (city) => city.title === action.payload
      )!;
    })
    .addCase(AddOffer, (state, action) => {
      state.offers = action.payload;
    });
});
