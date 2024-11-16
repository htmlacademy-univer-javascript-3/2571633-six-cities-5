import { useState } from 'react';
import OfferCard from './OfferCard';

type Offer = {
  id: number;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  isFavorite: boolean;
  NumberOfPlaces: number;
  previewImage: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
};

type OfferListProps = {
  offers: Offer[];
};

const OfferList = ({ offers }: OfferListProps) => {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        >
          <OfferCard offer={offer} />
        </div>
      ))}
      <div>{activeOfferId && <p>Active Offer ID: {activeOfferId}</p>}</div>
    </div>
  );
};

export default OfferList;
