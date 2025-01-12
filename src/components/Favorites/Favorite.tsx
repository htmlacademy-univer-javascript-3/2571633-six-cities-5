import {OfferFavoriteCard} from '../Offer/OfferFavoriteCard';


import { CardCssNameList, AppRoute } from '../../types/types';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavorites } from '../../api-actions';

import { useEffect } from 'react';
/*
type FavoriteProps = {
  offers: OfferIdDetails[] | null;

};*/
const Favorite = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchFavorites(),
    );
  }, [dispatch]);

  const favorites = useAppSelector((state) => state.Favorites.favorites);
  const isLoading = useAppSelector((state) => state.Favorites.isFavoritesDataLoading);
  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className={`favorites ${(favorites === undefined || favorites?.length === 0) ? 'favorites--empty' : null }`}>
            {((isLoading === 'Failure' || isLoading === 'Success' || isLoading === undefined) && (favorites === undefined || favorites?.length === 0))
              ?
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>
              :
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <div className="favorites__list">
                  {favorites?.filter((a) =>a.isFavorite === true)?.map((offer) => (
                    <OfferFavoriteCard key={offer.id} offer={offer} cardcssname={CardCssNameList.favoritePlace} />
                  ))}
                </div>
              </>}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

export default Favorite;

/*
type FavoriteProps = {
  offers: OfferIdDetails[] | null;

};
const Favorite = ({ offers }: FavoriteProps) => (
  <div className="page">
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listings</h1>
          <div className="favorites__list">
            {offers?.filter((a) =>a.isFavorite === true)?.map((offer) => (
              <OfferCard key={offer.id} offer={offer} cardcssname={CardCssNameList.favoritePlace} />
            ))}
          </div>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  </div>
);

export default Favorite;
*/
