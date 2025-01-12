import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from './components/MainPage/MainPage';
import Favorite from './components/Favorites/Favorite';
import LoginPage from './components/Login/LoginPage';

import Offer from './components/Offer/Offer';
import { useAppSelector,useAppDispatch } from './hooks';
import { fetchOfferObjectAction } from './api-actions.ts';
import PrivateRoute from './components/routes/private-route/index.tsx';
import { getAuthStatus } from './store/userselector.ts';

import NotFoundPage from './components/NotFoundPage/NotFoundPage.tsx';

//import LoadingScreen from './components/loading-screen/loading-screen';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  //const isLoading = useAppSelector(getLoadingOfferPage);
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offerPage);

  useEffect(() => {
    dispatch(fetchOfferObjectAction());
  }, [dispatch]);
  // eslint-disable-next-line no-unused-expressions
  const authorizationStatus = useAppSelector(getAuthStatus);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage offers={offers.offer} currentCity={currentCity.currentCity}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route key="/offer/:id" path="/offer/:id"
            element={<PrivateRoute key="/offer/:id" authState={authorizationStatus}>{<Offer />}</PrivateRoute>}
          />
          <Route path="/favorites" element={<Favorite />} />

          <Route path="/NotFoundPage" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};
