import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import Favorite from './Favorite.tsx';
//import { mockState } from '../../shared/mocks';
import thunk from 'redux-thunk';
import { api } from '../../store/index.ts';
import { AppDispatch, RootState } from '../../shared/lib/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/index.tsx';
import { AppRoute } from '../../types/types.ts';
//import { mockState } from '../../shared/mocks/index.ts';
//import { AppRoute } from '../../types/types.ts';

vi.mock('../Offer/OfferFavoriteCard', () => ({
  CityOffersList: () => <div data-testid="city-offers-list">CityOffersList</div>,
}));
vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const middleware = [thunk.withExtraArgument(api)];
const mockStoreCreator = configureMockStore<
  RootState,
  Action<string>,
  AppDispatch
>(middleware);
describe('Favorite', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });
  it('should render empty state when there are no Favorite', () => {

    const mockStateFavorites = {
      Favorites: {
        favorites: [],
        isFavoritesDataLoading: 'Success',
      },
    };

    const store = mockStoreCreator(mockStateFavorites);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorite />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText('Save properties to narrow down search or plan your future trips.')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('city-offers-list')).not.toBeInTheDocument();
  });
  /*
  it('should render saved listings when favorites are available', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
    const mockStateCopy = structuredClone(mockState);

    mockStateCopy.Favorites.favorites = [
      {
        id: '1',
        title: 'Test offer',
        type: 'apartment',
        price: 100,
        isFavorite: false,
        isPremium: true,
        rating: 4.5,
        city: {name: 'Paris', location: {
          latitude: 48.8566, longitude: 2.3522,
          zoom: 0
        }},
        location: {
          lat: 48.8566, lng: 2.3522,
          title: ''
        }
      },
    ];

    const store = mockStoreCreator(mockStateCopy);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorite />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('city-offers-list')).toBeInTheDocument();
  });
*/
  it('should display the footer with a link to the main page', () => {
    const mockStateFavorites = {
      Favorites: {
        favorites: [],
        isFavoritesDataLoading: 'Success',
      },
    };
    const store = mockStoreCreator(mockStateFavorites);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorite />
        </MemoryRouter>
      </Provider>
    );

    const footerLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(footerLink).toHaveAttribute('href', AppRoute.Main);
  });
});
