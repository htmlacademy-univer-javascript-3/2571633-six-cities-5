import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Favorite from './components/Favorites/Favorite';
import LoginPage from './components/Login/LoginPage';
import Offer from './components/Offer/Offer';
import { useAppSelector } from './hooks';
import { REVIEWERS } from './mock/reviewers';
//import LoadingScreen from './components/loading-screen/loading-screen';

export const App: React.FC = () => {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offerPage);
  const cities = useAppSelector((state) => state.Cities);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage currentCity={currentCity.currentCity} cities={cities.cities}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<Offer reviews={REVIEWERS} offers={offers.offer} currentCity={currentCity.currentCity}/>} />
        <Route path="/favorites" element={<Favorite offers={offers.offer} />} />
      </Routes>
    </Router>
  );
};
