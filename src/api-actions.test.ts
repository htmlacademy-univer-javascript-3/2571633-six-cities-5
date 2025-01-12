import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppDispatch, RootState } from './shared/lib/types';
import {
  api,
  fetchComments,
  fetchFavorites,
  fetchOffer,
  fetchOfferNeibourhood,
  fetchOfferObjectAction,
  login,
  logout,
  postComment,
  setIsOfferFavorite,
} from './api-actions';
import { extractActionsTypes } from './shared/lib';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));
describe('Async actions', () => {
  const mockAxios = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<
    RootState,
    Action<string>,
    AppDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  beforeEach(() => {
    store = mockStoreCreator();
    mockAxios.reset();
  });

  it('should dispatch setUserData and setAuthorizationStatus on successful userLogin', async () => {
    const mockUserData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: '/img/avatar.jpg',
      isPro: true,
      token: 'token123',
    };
    mockAxios.onPost('/login').reply(200, mockUserData);
    // eslint-disable-next-line no-console
    await store.dispatch(
      login({ email: 'john.doe@example.com', password: 'a1' })
    );
    const actions = extractActionsTypes(store.getActions());
    const fetchloginFulfilled = store.getActions().at(1) as ReturnType<
      typeof login.fulfilled
    >;
    expect(actions).toEqual([
      'user/login/pending',
      'user/login/fulfilled',
      //expect.objectContaining({ type: 'User/login/fulfilled' }),
    ]);
    expect(fetchloginFulfilled.payload).toEqual(mockUserData);
  });
  it('should dispatch clearUserData and setAuthorizationStatus(false) on userLogout', async () => {
    mockAxios.onDelete('/logout').reply(204);

    await store.dispatch(logout());

    const actions = store.getActions();
    const fetchlogoutFulfilled = store.getActions().at(1) as ReturnType<
      typeof logout.fulfilled
    >;
    expect(extractActionsTypes(actions)).toEqual([
      'user/logout/pending',
      'user/logout/fulfilled',
    ]);
    expect(fetchlogoutFulfilled.payload).toEqual(undefined);
  });

  it('should dispatch setOffers and setOffersLoadingStatus on fetchOffers', async () => {
    const mockOffers = [
      {
        id: '1',
        title: 'Mock offer',
        type: 'apartment',
        price: 100,
        isFavorite: false,
        isPremium: true,
        rating: 4.5,
        city: {
          name: 'Paris',
          location: { latitude: 48.8566, longitude: 2.3522 },
        },
        location: { latitude: 48.8566, longitude: 2.3522 },
      },
    ];
    mockAxios.onGet('/offers').reply(200, mockOffers);

    await store.dispatch(fetchOfferObjectAction());
    //const fetchofferFulfilled = store.getActions().at(1) as ReturnType<
    //  typeof fetchOffer.fulfilled
    //>;
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      'data/fetchOffers/pending',
      'data/fetchOffers/fulfilled',
      //expect.objectContaining({ type: 'User/login/fulfilled' }),
    ]);
    const fetchOfferFulfilled = store.getActions().at(1) as ReturnType<
      typeof fetchOfferObjectAction.fulfilled
    >;
    expect(fetchOfferFulfilled.payload).toEqual(mockOffers);
  });

  it('should dispatch setOffer and setOfferLoadingStatus on fetchOffer', async () => {
    const mockOffer = {
      id: '1',
      title: 'Mock offer',
      type: 'apartment',
      price: 100,
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522 },
      },
      location: { latitude: 48.8566, longitude: 2.3522 },
    };
    mockAxios.onGet('/offers/1').reply(200, mockOffer);

    await store.dispatch(fetchOffer('1'));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      'data/fetchOfferId/pending',
      'data/fetchOfferId/fulfilled',
      //expect.objectContaining({ type: 'User/login/fulfilled' }),
    ]);
    const fetchOfferIdFulfilled = store.getActions().at(1) as ReturnType<
      typeof fetchOffer.fulfilled
    >;
    expect(fetchOfferIdFulfilled.payload).toEqual(mockOffer);
  });
  it('should dispatch setNearbyOffers on fetchOffersNearby', async () => {
    const mockNearbyOffers = [
      {
        id: '2',
        title: 'Nearby offer',
        type: 'room',
        price: 80,
        isFavorite: false,
        isPremium: false,
        rating: 4.0,
        city: {
          name: 'Paris',
          location: { latitude: 48.8566, longitude: 2.3522 },
        },
        location: { latitude: 48.8566, longitude: 2.3522 },
      },
    ];
    mockAxios.onGet('/offers/1/nearby').reply(200, mockNearbyOffers);

    await store.dispatch(fetchOfferNeibourhood('1'));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      'data/fetchOfferNearby/pending',
      'data/loadOfferNearby',
      'data/fetchOfferNearby/fulfilled',
    ]);
    const fetchOfferIdFulfilled = store.getActions().at(1) as ReturnType<
      typeof fetchOfferNeibourhood.fulfilled
    >;
    expect(fetchOfferIdFulfilled.payload).toEqual(mockNearbyOffers);
  });
  it('should dispatch setComments and setCommentsLoadingStatus on fetchComments', async () => {
    const mockComments = [
      {
        id: 1,
        date: '2023-10-01T12:34:56Z',
        user: { name: 'John Doe', avatarUrl: '/img/avatar.jpg', isPro: false },
        comment: 'Great place!',
        rating: 5,
      },
    ];
    mockAxios.onGet('/comments/1').reply(200, mockComments);

    await store.dispatch(fetchComments('1'));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      'data/fetchComments/pending',
      'data/loadComments',
      'data/fetchComments/fulfilled',
    ]);
    const fetchCommentsFulfilled = store.getActions().at(1) as ReturnType<
      typeof fetchComments.fulfilled
    >;
    expect(fetchCommentsFulfilled.payload).toEqual(mockComments);
  });
  it('should handle createComment by dispatching fetchComments on success when offer matches', async () => {
    mockAxios.onPost('/comments/1').reply(201);

    await store.dispatch(
      postComment({ comment: 'Great place!', id: '1', rating: 5 })
    );

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      'post/Comment/pending',
      'data/loadComments',
      'post/Comment/fulfilled',
    ]);
    const postCommentFulfilled = store.getActions().at(1) as ReturnType<
      typeof postComment.fulfilled
    >;
    expect(postCommentFulfilled.payload).toEqual(undefined);
  });

  it('should not dispatch fetchComments if offer ID does not match', async () => {
    mockAxios.onPost('/comments/2').reply(201);

    await store.dispatch(fetchComments('2'));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      'data/fetchComments/pending',
      'data/fetchComments/rejected',
    ]);

    expect(actions).not.toContainEqual(
      expect.objectContaining({ type: 'Comments/fetch/pending' })
    );
  });

  it('should dispatch setFavorites and setFavoritesLoadingStatus on fetchFavorites', async () => {
    const mockFavorites = [
      {
        id: '1',
        title: 'Favorite offer',
        type: 'house',
        price: 200,
        isFavorite: true,
        isPremium: true,
        rating: 4.8,
        city: {
          name: 'Amsterdam',
          location: { latitude: 52.3676, longitude: 4.9041 },
        },
        location: { latitude: 52.3676, longitude: 4.9041 },
      },
    ];
    mockAxios.onGet('/favorite').reply(200, mockFavorites);

    await store.dispatch(fetchFavorites());

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      '/favorite/fetchfavorite/pending',
      '/favorite/loading',
      '/favorite/set',
      '/favorite/loading',
      '/favorite/fetchfavorite/fulfilled',
    ]);
    const fetchFavoritesFulfilled = store.getActions().at(1) as ReturnType<
      typeof fetchFavorites.fulfilled
    >;
    expect(fetchFavoritesFulfilled.payload).toEqual('Pending');
  });
  it('should handle changeFavorite by dispatching fetchFavorites and fetchOffers', async () => {
    mockAxios.onPost('/favorite/1/1').reply(200);

    await store.dispatch(
      setIsOfferFavorite({ offerId: '1', isFavorite: true })
    );

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      'offer/setIsOfferFavorite/pending',
      'offer/set',
      '/favorite/fetchfavorite/pending',
      '/favorite/loading',
      'offer/setIsOfferFavorite/fulfilled',
    ]);
  });
});
