import { memo } from 'react';
import { EmptyCityProps } from '../../types/types';

function MemoEmptyCityBlock({city}:EmptyCityProps) {
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
        </div>
      </section>
      <div className="cities__right-section"><section className="cities__map map"></section></div>
    </div>
  );
}

export const EmptyCityBlock = memo(MemoEmptyCityBlock);
