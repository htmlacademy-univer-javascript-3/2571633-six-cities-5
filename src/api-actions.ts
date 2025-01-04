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

//import {redirectToRoute} from './action';
//import { saveToken, dropToken } from './token';
import { APIRoute } from './const';
import { UserAuth, LoginAuth } from './types/types';
//import {UserData} from '../types/user-data';
import { createAPI } from './api';
import { dropToken, saveToken } from './token';
import { setOffer, setUser } from './action';

export const api = createAPI();
export const loadOfferNearby = createAction<OfferIdDetails[]>(
  'data/loadOfferNearby'
);
export const loadComments = createAction<UserReview[]>('data/loadComments');
export const fetchOfferObjectAction = createAsyncThunk<
  OfferIdDetails[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async () => {
  const { data } = await api.get<OfferIdDetails[]>(APIRoute.Offers);
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
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserAuth>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  //dispatch(redirectToRoute(AppRoute.Result));
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //  dispatch(FillEmail(email));
  return {
    name: data.name,
    avatarUrl: data.avatarUrl,
    isPro: data.isPro,
    email: data.email,
    token: data.token,
  };
});
export const checkAuthAction = createAsyncThunk<
  UserAuth,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (token, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserAuth>(APIRoute.Login, {
      params: { 'X-Token': token },
    });
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //dispatch(FillEmail(data.email));
    dispatch(setUser(data));
    return {
      name: data.name,
      avatarUrl: data.avatarUrl,
      isPro: data.isPro,
      email: data.email,
      token: data.token,
    };
  } catch (error) {
    return {
      name: '',
      avatarUrl: '',
      isPro: false,
      email: '',
      token: '',
    };
  }
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
  const { data } = await api.get<OfferIdDetails[]>(
    `${APIRoute.Offers}/${id}/nearby`
  );
  dispatch(loadOfferNearby(data?.slice(0, 3)));
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
export const setIsOfferFavorite = createAsyncThunk<
  void,
  { offerId: string | undefined; isFavorite: boolean },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offer/setIsOfferFavorite',
  async ({ offerId, isFavorite }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferIdDetails>(
      `/favorite/${offerId}/${Number(isFavorite)}`
    );
    dispatch(setOffer(data));
  }
);
