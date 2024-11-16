import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Favorite from './components/Favorites/Favorite';
import LoginPage from './components/Login/LoginPage';
import Offer from './components/Offer/Offer';
import { useAppSelector } from './hooks';
import { REVIEWERS } from './mock/reviewers';


export const App: React.FC = () => {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);
  const cities = useAppSelector((state) => state.cities);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} currentCity={currentCity} cities={cities}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<Offer reviews={REVIEWERS} offers={offers} currentCity={currentCity}/>} />
        <Route path="/favorites" element={<Favorite offers={offers} />} />
      </Routes>
    </Router>
  );
};
