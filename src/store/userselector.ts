import { createSelector } from '@reduxjs/toolkit';
import { AuthorizationSlice, State } from '../types/types';
const selectAuthStatus = (state: Pick<State, 'user'>) =>
  state.user.authorizationStatus;

export const getAuthStatus = createSelector(
  [selectAuthStatus],
  (items) => items
);
export const getUserEmail = (state: State): string | undefined =>
  state['user'].userData?.email;
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
