import {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import OfferList from '../Offer/OfferList';
import { useAppDispatch } from '../../hooks';
import { OfferObject,AppRoute, City, CardCssNameList } from '../../types/types';
import { changeCity } from '../../action';
import { ListCities } from '../../components/CityList/CityList';
import Map from '../Map/Map';
type MainPageProps = {
  offers: OfferObject[];
  currentCity: City;
  cities: City[];
};
export const MainPage : FC<MainPageProps> = ({
  offers,
  currentCity,
  cities,
}:MainPageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUserSelectCity = (cityName: string) => {
    dispatch(changeCity(cityName));
    // dispatch(fillOffers());
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active"
                onClick={() =>
                  navigate(AppRoute.Main)}
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">nawwarkheder@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
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
            <ListCities currentCity={currentCity.title} cities={cities} onSelect={handleUserSelectCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.filter((a) =>a.city.name === currentCity.title).length} places to stay in {currentCity.title}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList offers={offers.filter((a) =>a.city.name === currentCity.title)} cardcssname={CardCssNameList.citiesList}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers.filter((a) =>a.city.name === currentCity.title)} selectedPoint={offers[3]} currentCity={currentCity} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MainPage;
