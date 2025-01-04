/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from 'react-router-dom';
import SendCommentForm from '../SendCommentForm/SendCommentForm';
import { ReviewList } from '../Reviews/ReviewList';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import Map from '../Map/Map';
import { AppRoute, UserReview, CardCssNameList, OfferIdDetails } from '../../types/types';
import { AuthorizationStatus } from '../../const.ts';
import OfferList from './OfferList.tsx';
import { getAuthStatus,getUserEmail} from '../../store/userselector.ts';
import { fetchComments, fetchOffer, fetchOfferNeibourhood, logout, setIsOfferFavorite } from '../../api-actions.ts';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { store } from '../../store/index.ts';


export default function Offer () {
  const { id: OfferId } = useParams();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getUserEmail);
  const authStatus = useAppSelector(getAuthStatus);
  const currentCity = useAppSelector((state) => state.currentCity);
  useEffect(()=>{
    store.dispatch(fetchOffer(OfferId ?? ''));
    store.dispatch(fetchOfferNeibourhood(OfferId ?? ''));
    store.dispatch(fetchComments(OfferId ?? ''));
  },[OfferId,dispatch]);
  const nearbyOffers = useAppSelector((state) => state.offerIdDetails.nearbyOffers);
  const offerdetails = useAppSelector((state) => state.offerIdDetails.offer);
  const offers = useAppSelector((state) => state.offerPage);
  const comments:UserReview[] = useAppSelector((state) => state.offerIdDetails.comments);

  const offersForMap: OfferIdDetails[] = useMemo(()=>nearbyOffers.slice(0,3).concat(offerdetails || []),[nearbyOffers, offerdetails]);


  const [ isFavorite, setisFavorite ] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setisFavorite(offerdetails?.isFavorite ?? false);
  }, [offerdetails?.isFavorite]);

  const onFavoriteClick = () => {
    if(authStatus === AuthorizationStatus.NoAuth || authStatus === AuthorizationStatus.Unknown) {
      //return dispatch(redirectToRoute(AppRoute.Login));
      navigate(AppRoute.Login);
      return;
    }
    dispatch(
      setIsOfferFavorite({
        offerId: offerdetails?.id,
        isFavorite: !isFavorite
      }),
    );
    setisFavorite(!isFavorite);
    //window.location.reload();
  };
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

                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Main}>

                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {userEmail}
                    </span>
                    <span className="header__favorite-count">3</span>

                  </Link>

                </li>
                <li className="header__nav-item">
                  {
                    authStatus === AuthorizationStatus.Auth ?

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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerdetails?.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Фото студии" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerdetails?.isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerdetails?.title}
                </h1>
                {authStatus && (
                  <button
                    className={classNames('place-card__bookmark-button', 'button', {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      ['place-card__bookmark-button--active']: isFavorite,
                    })}
                    type="button"
                    onClick={onFavoriteClick}
                  >
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                )}
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offerdetails?.rating ?? 0 / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerdetails?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerdetails?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerdetails?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                Max {offerdetails?.maxAdults} Adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerdetails?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerdetails?.goods.map((ins) => (
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
                    <img className="offer__avatar user__avatar" src={offerdetails?.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {offerdetails?.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offerdetails?.host.isPro}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerdetails?.description}
                  </p>
                </div>
              </div>
              <ReviewList reviews={comments} containerMix="offer__reviews" />
            </div>
          </div>
          <section className="offer__map map">
            {offers !== null && offers.offer !== null && offers.offer.length > 0 ?
              <Map

                offers={offers === null ? undefined : offersForMap}

                selectedPoint={offers.offer?.[1]}
                currentCity={currentCity.currentCity}
                activeOffer={offers.offer === null ? null : offers?.offer[1].id}
              /> : <Map offers={undefined} currentCity={currentCity.currentCity} activeOffer={null} selectedPoint={undefined} />}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
            Other places in the neighbourhood
            </h2>
            <OfferList offers={nearbyOffers} cardcssname={CardCssNameList.citiesList} />
          </section>
        </div>
        <div>
          <h2 className="reviews__title">Reviews</h2>
          {authStatus === AuthorizationStatus.Auth ? <SendCommentForm /> : null}
        </div>
      </main>
    </div>
  );
}
