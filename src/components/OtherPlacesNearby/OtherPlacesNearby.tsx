import OfferList from '../Offer/OfferList';
import { offers } from '../../mock/offers';
import {CardCssNameList } from '../../types/types';
export const OtherPlacesNearby = () => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>

    <OfferList offers={offers.slice(0, 3)} cardcssname={CardCssNameList.neardPlace} />
  </section>
);
