import OfferList from '../Offer/OfferList';
import { offers } from '../../mock/offers';

export const OtherPlacesNearby = () => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>

    <OfferList offers={offers.slice(0, 3)} />
  </section>
);
