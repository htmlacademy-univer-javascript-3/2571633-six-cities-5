/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AppDispatch,
  OfferIdDetails,
  State,
  UserReview,
  UserReviewPost,
} from './types/types';
import { OfferObject } from './types/types';
//import {redirectToRoute} from './action';
//import { saveToken, dropToken } from './token';
import { APIRoute } from './const';
import { UserAuth, LoginAuth } from './types/types';
//import {UserData} from '../types/user-data';
import { createAPI } from './api';
import { dropToken, saveToken } from './token';

export const api = createAPI();
export const loadOfferNearby = createAction<OfferObject[]>(
  'data/loadOfferNearby'
);
export const loadComments = createAction<UserReview[]>('data/loadComments');
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
export const fetchOffer = createAsyncThunk<
  OfferIdDetails,
  string,
  {
    //    dispatch: AppDispatch;
    //    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOfferId', async (id, { extra: api }) => {
  const { data } = await api.get<OfferIdDetails>(`${APIRoute.Offers}/${id}`);
  return data;
});
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

export const fetchOfferNeibourhood = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOfferNearby', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferObject[]>(
    `${APIRoute.Offers}/${id}/nearby`
  );
  dispatch(loadOfferNearby(data));
});

export const fetchComments = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<UserReview[]>(`${APIRoute.Comments}/${id}`);
  dispatch(loadComments(data));
});

export const postComment = createAsyncThunk<
  void,
  UserReviewPost,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('post/Comment', async ({ comment, rating, id }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserReview[]>(`${APIRoute.Comments}/${id}`, {
    comment,
    rating,
  });
  dispatch(loadComments(data));
});
