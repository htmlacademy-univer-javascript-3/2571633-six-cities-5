import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Favorite from './components/Favorites/Favorite';
import LoginPage from './components/Login/LoginPage';
import Offer from './components/Offer/Offer';

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

type AppProps = {
  offers: Offer[];
};

export default function App({ offers }: AppProps) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/favorites" element={<Favorite offers={offers} />} />
      </Routes>
    </Router>
  );
}
