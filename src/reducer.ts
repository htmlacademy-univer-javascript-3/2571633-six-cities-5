import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { City, OfferObject, OfferIdDetails } from './types/types';
import { changeCity, AddOffer, loadOffers, loadOfferDetails } from './action';
import { offerPage } from './store/offer-data';
import { offerPageId } from './store/offer-detail';

import { user } from './store/user';
import { CITYLIST } from './mock/cities';
import { emptyOffer } from './mock/offers';
//import { offerPageId } from './store/offer-detail';
//import { AuthorizationStatus } from './const';

type InitialState = {
  currentCity: City;
  cities: City[];
  offers: OfferObject[];
  offerIdDetails: OfferIdDetails;
  //authorizationStatus: AuthorizationStatus;
};

const initialState: InitialState = {
  currentCity: CITYLIST[0],
  cities: CITYLIST,
  offers: [],
  offerIdDetails: emptyOffer,
  //authorizationStatus: AuthorizationStatus.Unknown,
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
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOfferDetails, (state, action) => {
      state.offerIdDetails = action.payload;
    });
});

export const rootReducer = combineReducers({
  Cities: reducer,
  currentCity: reducer,
  offerPage: offerPage.reducer,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  offerIdDetails: offerPageId.reducer,
  user: user.reducer,
});
