import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from './components/MainPage/MainPage';
import Favorite from './components/Favorites/Favorite';
import LoginPage from './components/Login/LoginPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Offer from './components/Offer/Offer';
import { useAppSelector,useAppDispatch } from './hooks';
import { fetchOfferObjectAction } from './api-actions.ts';
//import LoadingScreen from './components/loading-screen/loading-screen';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  //const isLoading = useAppSelector(getLoadingOfferPage);
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offerPage);
  const cities = useAppSelector((state) => state.Cities);
  useEffect(() => {
    dispatch(fetchOfferObjectAction());
  }, [dispatch]);
  // eslint-disable-next-line no-unused-expressions

  const offerdetails = useAppSelector((state) => state.offerIdDetails);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage offers={offers.offer} currentCity={currentCity.currentCity} cities={cities.cities}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/offer/:id" element={(offers.offer?.filter((o) => o.id === offerdetails.offer.id).length) > 0 ? <Offer offerdetails={offerdetails.offer} offers={offers.offer} currentCity={currentCity.currentCity}/> : <NotFoundPage/>} />
          <Route path="/favorites" element={<Favorite offers={offers.offer} />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};
