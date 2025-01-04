import {OfferCard} from '../Offer/OfferCard';

import { OfferIdDetails, CardCssNameList } from '../../types/types';

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
  </div>
);

export default Favorite;
