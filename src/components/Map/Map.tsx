import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
type Offer = {
  id: number;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  previewImage: string;
  NumberOfPlaces: number;
  latitude: number;
  longitude:number;
};
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
type MainPageProps = {
  offers: Offer[];
  selectedPoint :Offer;
};

function Map(props: MainPageProps): JSX.Element {
  const {offers, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, "Амстердам");

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.latitude,
          lng: offer.longitude
        });
        marker
          .setIcon(
            selectedPoint !== undefined && offer.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers]);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

export default Map;
