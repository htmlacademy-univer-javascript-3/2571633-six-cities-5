import React from 'react';
import { City } from '../../types/types';

const CITY_ACTIVE = 'tabs__item--active';

type CitiesListProps = {
  currentCity: string;
  cities: City[];
  onSelect: (cityName: string) => void;
}

export const ListCities: React.FC<CitiesListProps> = ({
  currentCity,
  cities,
  onSelect,
}) => (
  <ul className="locations__list tabs__list">
    {cities.map((city) => (
      <li
        className="locations__item"
        key={city.title}
        onClick={() => {
          onSelect(city.title);
        }}
      >
        <div className={`
          locations__item-link
          tabs__item
          ${currentCity === city.title ? CITY_ACTIVE : ''}
          `}
        >
          <span>{city.title}</span>
        </div>
      </li>
    )
    )}
  </ul>
);
