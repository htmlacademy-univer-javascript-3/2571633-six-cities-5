import { createReducer } from '@reduxjs/toolkit';
import { setFavorites, setFavoritesLoadingStatus } from '../action.ts';
import { favoriteObject } from '../types/types.ts';

type FavoritesState = {
  favorites: favoriteObject[];
  isFavoritesDataLoading: string;
};

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesDataLoading: 'Init',
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setFavoritesLoadingStatus, (state, action) => {
      state.isFavoritesDataLoading = action.payload;
    });
});

export { favoritesReducer };
