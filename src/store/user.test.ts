import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { user } from './user';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AuthorizationStatus } from '../const';
import { api, checkAuthAction, login, logout } from '../api-actions';
import { changeAuthStatus, setUser } from '../action';
import { RootState } from './userselector';
import { AppDispatch, AppRoute, LoginAuth } from '../types/types';
import { extractActionsTypes } from '../shared/lib';
import * as tokenService from '../token';
describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const expectedRes = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      postError: false,
      userDataLoadingStatus: false,
      userEmail: '',
    };
    const action = { type: '' };
    const calculatedRes = user.reducer(expectedRes, action);
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const expectedRes = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      postError: false,
      userDataLoadingStatus: false,
      userEmail: '',
    };
    const action = { type: '' };
    const calculatedRes = user.reducer(undefined, action);
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with setted authStatus as AUTHENTICATED', () => {
    const expectedRes = {
      authorizationStatus: AuthorizationStatus.Auth,
      postError: false,
      userData: null,
      userDataLoadingStatus: false,
      userEmail: '',
    };
    const calculatedRes = user.reducer(
      undefined,
      changeAuthStatus(AuthorizationStatus.Auth)
    );
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with setted authStatus as AUTHENTICATED and filled user', () => {
    const expectedRes = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {
        name: 'Oliver Conner',
        avatarUrl: 'https://url-to-image/image.png',
        isPro: false,
        email: 'test@gmail.com',
        token: '',
      },
      userEmail: '',
      userDataLoadingStatus: false,
      postError: false,
    };
    const calculatedRes = user.reducer(
      undefined,
      setUser({
        name: 'Oliver Conner',
        avatarUrl: 'https://url-to-image/image.png',
        isPro: false,
        email: 'test@gmail.com',
        token: '',
      })
    );
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with setted authStatus as NO AUTHENTICATED and empty field user', () => {
    const expectedRes = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      userEmail: '',
      userDataLoadingStatus: false,
      postError: false,
    };
    const calculatedRes = user.reducer(undefined, setUser(null));
    expect(calculatedRes).toEqual(expectedRes);
  });
});

describe('User async actions', () => {
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<
    RootState,
    Action<string>,
    AppDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  beforeEach(() => {
    store = mockStoreCreator({
      user: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
      },
    });
  });

  describe('checkAuth', () => {
    it(`should dispatch "checkAuthActionkAuth.pending",
       "setUser","checkAuthAction.fulfilled" with thunk "checkAuth"`, async () => {
      mockAxiosAdapter.onGet(AppRoute.Login).reply(200);
      mockAxiosAdapter.onGet(AppRoute.Favorites).reply(200);
      await store.dispatch(checkAuthAction(''));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        setUser.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
    it(`should dispatch "checkAuth.pending",
       "fetchFavorites.pending",
       "checkAuth.fulfilled" with thunk "checkAuth"`, async () => {
      mockAxiosAdapter.onGet(AppRoute.Login).reply(401);
      await store.dispatch(checkAuthAction(''));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
  });

  describe('login', () => {
    it('should dispatch some actions "login"', async () => {
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter
        .onPost(AppRoute.Login, { email: 'test', password: 'test' })
        .reply(200, fakeServerReplay);
      mockAxiosAdapter.onGet(AppRoute.Offer).reply(200);
      mockAxiosAdapter.onGet(AppRoute.Favorites).reply(200);
      await store.dispatch(login({ email: 'test', password: 'test' }));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([login.pending.type, login.fulfilled.type]);
    });
    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: LoginAuth = {
        email: 'nawwar@gamil.ru',
        password: 'P@ssw0rd',
      };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(AppRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenService, 'saveToken');
      await store.dispatch(login(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logout', () => {
    it('should dispatch some actions "logout"', async () => {
      mockAxiosAdapter.onDelete('logout').reply(204);
      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([logout.pending.type, logout.fulfilled.type]);
    });
    it('call "dropToken" with "logout"', async () => {
      mockAxiosAdapter.onDelete('logout').reply(204);
      const mockDropToken = vi.spyOn(tokenService, 'dropToken');

      await store.dispatch(logout());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
