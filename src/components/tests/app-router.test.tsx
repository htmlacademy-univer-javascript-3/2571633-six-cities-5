import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen} from '@testing-library/react';
import { withHistory } from '../../shared/providers';
import { withStore } from '../../shared/providers/with-store';
import { makeFakeStore } from '../../shared/mocks';
import { AppRoute } from '../../types/types';
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
    const withHistoryComponent = withHistory(<MainPage currentCity={{
      title: '',
      lat: 0,
      lng: 0
    }} offers={[]}
    // eslint-disable-next-line react/jsx-closing-bracket-location
    />, mockHistory);
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
      userData: null ,
      postError: false,
      userDataLoadingStatus: false,
      userEmail: ''
    },}));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(1);
    expect(screen.getByTestId('location_item-link')).toBeInTheDocument();
  });

  it('should render MainPage when authenticated user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<MainPage currentCity={{
      title: '',
      lat: 0,
      lng: 0
    }} offers={[]}
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
  it('should render OfferPage when user navigate to "/offer/a01640c0-fed5-4d3f-99b3-deb2391269fc"', () => {
    const withHistoryComponent = withHistory(<Offer />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/offer/a01640c0-fed5-4d3f-99b3-deb2391269fc');
    render(withStoreComponent);
    expect(screen.getByText(/Wood and stone place/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
