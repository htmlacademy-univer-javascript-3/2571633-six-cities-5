import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen} from '@testing-library/react';
import { withHistory } from '../../shared/providers';
import { withStore } from '../../shared/providers/with-store';
import { makeFakeStore } from '../../shared/mocks';
import { App } from '../../App';
import { AppRoute, SortName } from '../../types/types';
import LoginPage from '../Login/LoginPage';
import { AuthorizationStatus } from '../../const';
import { Cities } from '../../shared/api';
import MainPage from '../MainPage/MainPage';
import Favorite from '../Favorites/Favorite';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Offer from '../Offer/Offer';


describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainPage when user navigate to "/"', () => {
    // eslint-disable-next-line react/jsx-no-undef
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('location_item')).toHaveLength(Object.values(Cities).length);
  });

  it('should render LoginPage when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<LoginPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({ user: {
      authorizationStatus:AuthorizationStatus.NoAuth,
      user: null
    },}));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByTestId('location_item-link')).toBeInTheDocument();
  });

  it('should render MainPage when authenticated user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<MainPage currentCity={{
      title: '',
      lat: 0,
      lng: 0
    }} cities={[]} offers={[]}
    // eslint-disable-next-line react/jsx-closing-bracket-location
    />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('location_item')).toHaveLength(Object.values(Cities).length);
  });

  it('should render FavoritesPage when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<Favorite offers={null} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render FavoritesPage when user navigate to "/favorites" with empty list', () => {
    const withHistoryComponent = withHistory(<Favorite offers={null} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({offer:{favorites:[],city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortName.popular,
      isLoading: false,
      offerOnPage:null}}));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to "/notFound"', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('NotFoundPage');

    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to non-existent path', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('123321');

    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('should render OfferPage when user navigate to "/offer/a20a52b2-efc2-4b0f-9396-4bdfbe5e9543"', () => {
    const withHistoryComponent = withHistory(<Offer offerdetails={{
      id: '',
      title: '',
      type: '',
      price: 0,
      city: {
        name: '',
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 0
        }
      },
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      },
      isFavorite: false,
      isPremium: false,
      rating: 0,
      description: '',
      bedrooms: 0,
      goods: [''],
      host: {
        name: '',
        avatarUrl: '',
        isPro: false
      },
      images: [''],
      maxAdults: 0
    }} offers={null} currentCity={{
      title: '',
      lat: 0,
      lng: 0
    // eslint-disable-next-line react/jsx-closing-bracket-location
    }} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/offer/a20a52b2-efc2-4b0f-9396-4bdfbe5e9543');

    render(withStoreComponent);

    expect(screen.getByText(/Wood and stone place/i)).toBeInTheDocument();
    expect(screen.getByText(/A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam./i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
