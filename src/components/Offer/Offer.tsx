/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SendCommentForm from '../SendCommentForm/SendCommentForm';
import { ReviewList } from '../Reviews/ReviewList';
import { useAppSelector } from '../../hooks/index';
//import { offers } from '../../mock/offers';

import Map from '../Map/Map';
import { AppRoute, UserReview, OfferObject, City,OfferIdDetails, CardCssNameList } from '../../types/types';
import { AuthorizationStatus } from '../../const.ts';
import OfferList from './OfferList.tsx';


type OfferProps = {
  offerdetails:OfferIdDetails;
  reviews: UserReview[];
  offers: OfferObject[] | null;
  currentCity: City;
};

export const Offer: React.FC<OfferProps> = ({
  // eslint-disable-next-line react/prop-types
  offerdetails,

  offers,
  currentCity,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access


  const authStatus = useAppSelector((store) => store.user.authorizationStatus);
  const nearbyOffers = useAppSelector((store) => store.offerIdDetails.nearbyOffers);
  const comments:UserReview[] = useAppSelector((store) => store.offerIdDetails.comments);


  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerdetails.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Фото студии" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerdetails.isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerdetails.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offerdetails.isFavorite ? 'In bookmark' : 'To bookmark'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offerdetails.rating / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerdetails.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerdetails.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerdetails.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                Max {offerdetails.maxAdults} Adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerdetails.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerdetails.goods.map((ins) => (
                    <li key={ins} className="offer__inside-item">
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offerdetails.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {offerdetails.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offerdetails.host.isPro}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerdetails.description}
                  </p>
                </div>
              </div>
              <ReviewList reviews={comments} containerMix="offer__reviews" />
            </div>
          </div>
          <section className="offer__map map">
            <Map
              offers={offers === null ? undefined : [...offers]}
              selectedPoint={offers?.[1]}
              currentCity={currentCity}
              activeOffer={offers === null ? null : offers[1].id}
            />
          </section>
        </section>
        <div className="container">
          <OfferList offers={nearbyOffers} cardcssname={CardCssNameList.citiesList} />
        </div>
        <div>
          <h2 className="reviews__title">Reviews</h2>
          {authStatus === AuthorizationStatus.Auth ? <SendCommentForm /> : null}
        </div>
      </main>
    </div>
  );
};
export default Offer;
