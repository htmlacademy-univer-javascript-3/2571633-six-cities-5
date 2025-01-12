/* eslint-disable @typescript-eslint/no-misused-promises */
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { mockState } from '../../shared/mocks';
import MainPage from './MainPage';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../Offer/OfferList', () => ({
  OfferList: () => <div data-testid="offer-list">OfferList</div>,
}));

vi.mock('../../Map/Map', () => ({
  Map: () => <div data-testid="map">Map</div>,
}));

vi.mock('../../spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner">Spinner</div>,
}));

describe('Component: MainPage', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  it('should render correctly with offers', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
    const mockStateCopy = structuredClone(mockState);
    mockStateCopy.offerPage.offer = [
      {
        id: '1',
        title: 'Nice apartment in Paris',
        type: 'apartment',
        price: 120,
        location: {
          latitude: 48.8566, longitude: 2.3522,
          zoom: 0
        },
        city: {
          name: 'Paris', location: {
            latitude: 48.8566, longitude: 2.3522,
            zoom: 0
          }
        },
        isFavorite: false,
        isPremium: true,
        rating: 4.5,
        description: '',
        bedrooms: 0,
        goods: [''],
        host: {
          name: '',
          avatarUrl: '',
          isPro: false
        },
        images: [''],
        maxAdults: 0,
        previewImage: ''
      },
    ];

    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockStateCopy)
    );

    render(
      <MemoryRouter>
        <MainPage currentCity={{
          title: 'Paris',
          lat: 48.8566,
          lng: 2.3522
        }} offers={mockStateCopy.offerPage.offer}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Nice apartment in Paris')).toBeInTheDocument();
    expect(screen.getByTitle('Zoom in')).toBeInTheDocument();
  });
});
