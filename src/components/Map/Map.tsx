import {useRef, useEffect} from 'react';
import leaflet, {Icon} from 'leaflet';
import useMap from '../../hooks/use-map';
import { OfferObject, City } from '../../types/types';
import 'leaflet/dist/leaflet.css';
const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const activeCustomIcon = new Icon({
  iconUrl: '../../markup/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
type MainPageProps = {
  offers: OfferObject[] | undefined;
  currentCity: City;
  selectedPoint: OfferObject | undefined;
  activeOffer: string | null;
};

function Map(props: MainPageProps): JSX.Element {
  const {offers, currentCity,activeOffer,selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity.title);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          layer.remove();
        }
      });

      offers?.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            // eslint-disable-next-line no-nested-ternary
            icon: activeOffer === offer.id ? activeCustomIcon : selectedPoint !== undefined && offer.title === selectedPoint.title ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers,activeOffer,selectedPoint]);

  return (<div style={{ height: '100%' }} ref={mapRef}></div>);
}

export default Map;
