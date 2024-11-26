/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './types/types';
import { OfferObject } from './types/types';
//import {redirectToRoute} from './action';
//import { saveToken, dropToken } from './token';
import { APIRoute } from './const';
import { UserAuth, LoginAuth } from './types/types';
//import {UserData} from '../types/user-data';
import { createAPI } from './api';
import { dropToken, saveToken } from './token';

export const api = createAPI();
export const fetchOfferObjectAction = createAsyncThunk<
  OfferObject[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async () => {
  const { data } = await api.get<OfferObject[]>(APIRoute.Offers);
  return data;
});
/*
export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);
*/
export const login = createAsyncThunk<
  UserAuth,
  LoginAuth,
  {
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserAuth>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  //dispatch(redirectToRoute(AppRoute.Result));
  return {
    name: data.name,
    avatarUrl: data.avatarUrl,
    isPro: data.isPro,
    email: data.email,
    token: data.token,
  };
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
