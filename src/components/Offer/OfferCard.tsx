import React from 'react';
import { Link } from 'react-router-dom';
import { OfferObject } from '../../types/types';
import { useState } from 'react';
import { fetchComments, fetchOffer, fetchOfferNeibourhood } from '../../api-actions';
//import {MouseEvent} from 'react';
import { store } from '../../store';
//import { useAppDispatch } from '../../hooks';
type OfferCardProps = {
  offer: OfferObject;
  cardcssname: string;
  setActiveOffer?: (id: string | null) => void;
};
//import { store } from '../../store/index.ts';
export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  cardcssname,
  setActiveOffer,
}) => {
  //const dispatch = useAppDispatch();
  const [ isActiveCard, setActiveCard ] = useState(false);
  const handleOfferIdLoad = () => {
    //event.preventDefault();
    store.dispatch(fetchOffer(offer.id));
    store.dispatch(fetchOfferNeibourhood(offer.id));
    store.dispatch(fetchComments(offer.id));
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
};
export default OfferCard;
