import {FC} from 'react';
import { useMemo,useState } from 'react';

import { Link } from 'react-router-dom';
//import Spinner from '../spinner/spinner.tsx';
import OfferList from '../Offer/OfferList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, City, CardCssNameList, SortName, OfferIdDetails, Cities} from '../../types/types';

import { changeCity } from '../../action';
import { ListCities } from '../../components/CityList/CityList';
import { FilterOffer } from '../FilterOffers/FilterOffer';
import { getAuthStatus,getUserEmail} from '../../store/userselector.ts';
import Map from '../Map/Map';
import { AuthorizationStatus } from '../../const.ts';
import { logout } from '../../api-actions.ts';
import { EmptyCityBlock } from '../Main-Empty/Main-Empty.tsx';
//import { getToken } from '../../token.ts';
type MainPageProps = {
  currentCity: City;
  offers: OfferIdDetails[];
};
export const MainPage : FC<MainPageProps> = ({
  currentCity,
  offers,
}:MainPageProps) => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getUserEmail);
  const authStatus = useAppSelector(getAuthStatus);
  const authStatusMemo = useMemo(() => authStatus,[authStatus]);
  const userEmailMemo = useMemo(() => userEmail, [userEmail]);
  const offerListMemo = useMemo(() => offers, [offers]);
  const cities = useAppSelector((state) => state.Cities);
  //  const isLoading = useAppSelector(getLoadingOfferPage);
  //  const offers = useAppSelector(getOffer);
  //useEffect(() => {
  //dispatch(fetchOfferObjectAction());
  //}, [dispatch]);
  const handleUserSelectCity = (cityName: string) => {
    dispatch(changeCity(cityName));
    // dispatch(fillOffers());
  };
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const [sortType, setSortType] = useState<SortName>(SortName.popular);
  const sortedOffers = useMemo(
    () => (offerListMemo ?? []).filter((offer) => offer.city.name === currentCity?.title).slice().sort((a, b) => {
      switch (sortType) {
        case SortName.lowToHigh:
          return a.price - b.price;
        case SortName.highToLow:
          return b.price - a.price;
        case SortName.topRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    }),
    [currentCity?.title, offerListMemo, sortType],
  );

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">

              <Link className="header__logo-link header__logo-link--active"
                to={AppRoute.Main}

              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {
                  authStatusMemo === AuthorizationStatus.Auth ?
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Main}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{userEmailMemo}</span>
                        <span className="header__favorite-count">3</span>
                      </Link>

                    </li> : null
                }
                <li className="header__nav-item">
                  {
                    authStatusMemo === AuthorizationStatus.Auth ?

                      <Link className="header__nav-link" to = '/'>
                        <span className="header__signout"
                          onClick={(evt) => {
                            evt.preventDefault();
                            dispatch(logout());
                          }}
                        >Sign out
                        </span>
                      </Link> :

                      <Link className="header__nav-link" to = {AppRoute.Login}>
                        <span className="header__signout"> Sign in</span>
                      </Link>
                  }
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ListCities currentCity={currentCity.title} cities={cities.cities} onSelect={handleUserSelectCity}/>
          </section>
        </div>
        <div className="cities">
          {
            !offerListMemo.length ?
              <EmptyCityBlock city={Cities[currentCity.title as keyof typeof Cities]}/>
              :
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offerListMemo?.filter((a) =>a.city.name === currentCity.title).length} places to stay in {currentCity.title}</b>


                  <FilterOffer currentSort={sortType} onSortChange={setSortType} /><div className="cities__places-list places__list tabs__content"><OfferList offers={sortedOffers?.filter((a) => a.city.name === currentCity.title)} cardcssname={CardCssNameList.citiesList} setActiveOffer={setActiveOffer} /></div>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map offers={sortedOffers?.filter((a) =>a.city.name === currentCity.title)} selectedPoint={sortedOffers?.[0]} activeOffer={activeOffer} currentCity={currentCity} />
                  </section>
                </div>
              </div>
          }
        </div>
      </main>
    </div>
  );
};
export default MainPage;
