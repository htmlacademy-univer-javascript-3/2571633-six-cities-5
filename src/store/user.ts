import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { AuthorizationSlice } from '../types/types';
import { login, logout } from '../api-actions';

const initialState: AuthorizationSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  postError: false,
  userDataLoadingStatus: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        state.userDataLoadingStatus = false;
        state.postError = false;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.postError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(login.pending, (state) => {
        state.userDataLoadingStatus = true;
      });
  },
});
