import OfferCard from '../Offer/OfferCard';
type Offer = {
  id: number;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  previewImage: string;
  NumberOfPlaces: number;
};
type FavoriteProps = {
  offers: Offer[];
};
const Favorite = ({ offers }: FavoriteProps) => (
  <div className="page">
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listings</h1>
          <div className="favorites__list">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default Favorite;
