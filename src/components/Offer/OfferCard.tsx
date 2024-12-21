
import { Link,useNavigate } from 'react-router-dom';
import { AppRoute, OfferObject } from '../../types/types';
import { useEffect, useState } from 'react';
import { fetchComments, fetchOffer, fetchOfferNeibourhood, setIsOfferFavorite } from '../../api-actions';
//import {MouseEvent} from 'react';
import { store } from '../../store';
import { useAppSelector } from '../../hooks';
import { getAuthStatus} from '../../store/userselector.ts';
import classNames from 'classnames';
import { AuthorizationStatus } from '../../const.ts';
type OfferCardProps = {
  offer: OfferObject;
  cardcssname: string;
  setActiveOffer?: (id: string | null) => void;
};

//import { store } from '../../store/index.ts';
// eslint-disable-next-line react-refresh/only-export-components
export function OfferCard ({offer, cardcssname, setActiveOffer}: OfferCardProps): JSX.Element{

  const [ isActiveCard, setActiveCard ] = useState(false);
  const [ isFavorite, setisFavorite ] = useState(false);
  const handleOfferIdLoad = () => {
    //event.preventDefault();
    store.dispatch(fetchOffer(offer.id));
    store.dispatch(fetchOfferNeibourhood(offer.id));
    store.dispatch(fetchComments(offer.id));
    setisFavorite(offer.isFavorite);
  };
  useEffect(() => {
    setisFavorite(offer.isFavorite);
  }, [offer.isFavorite]);
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const onFavoriteClick = () => {
    if(authStatus === AuthorizationStatus.NoAuth || authStatus === AuthorizationStatus.Unknown) {
      //return dispatch(redirectToRoute(AppRoute.Login));
      navigate(AppRoute.Login);
      return;
    }
    store.dispatch(
      setIsOfferFavorite({
        offerId: offer.id,
        isFavorite: !isFavorite
      }),
    );
    setisFavorite(!isFavorite);
    //window.location.reload();
  };
  return (
    <article className={`${cardcssname} place-card`}
      onMouseEnter={() => setActiveOffer && setActiveOffer(offer.id)}
      onMouseLeave={() => setActiveOffer && setActiveOffer(null)}
      onMouseOver={() => setActiveCard(!isActiveCard)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper" onClick={handleOfferIdLoad}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.title} onClick={handleOfferIdLoad}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
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
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={handleOfferIdLoad}>
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
//export const OfferCard ;//= memo(MemoOfferCard);


