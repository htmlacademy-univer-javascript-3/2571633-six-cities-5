import { createSelector } from '@reduxjs/toolkit';
import { AuthorizationSlice, State } from '../types/types';

export const getAuthStatus = createSelector(
  (state: State) => state['user'],
  (state: AuthorizationSlice) => state.authorizationStatus
);

export const getUserData = createSelector(
  (state: State) => state['user'],
  (state: AuthorizationSlice) => state.userData
);

export const getUserPostError = createSelector(
  (state: State) => state['user'],
  (state: AuthorizationSlice) => state.postError
);

export const getUserDataLoadingStatus = createSelector(
  (state: State) => state['user'],
  (state: AuthorizationSlice) => state.userDataLoadingStatus
);
