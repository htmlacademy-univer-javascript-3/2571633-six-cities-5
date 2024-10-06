import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {MainPage} from '../MainPage/MainPage.tsx';
import { LoginPage } from '../Login/LoginPage';
import { Offer } from '../Offer/Offer';
import { Favorite } from '../Favorites/Favorite';
import { Error404 } from '../Error/Error404';
import {mainPageCardInfo} from '../../index.tsx';
import {cardProperties} from '../../index.tsx';
import { UserContextProvider } from '../User';
import { LoggedRoute } from '../LoggedRoute';

type Props = {
  mainPageCardInfo: cardProperties[];
};

export const Main: React.FC<Props> = ({ mainPageCardInfo }) => (
  <UserContextProvider>
	<BrowserRouter>
	  <Routes>
		<Route path="/LoginPage" element={<LoginPage />} />
		<Route path="/" element={<MainPage CardProps={mainPageCardInfo} />} />	  		
		<Route path="/favorites" element={<LoggedRoute>
              <Favorite />
            </LoggedRoute>} />
		<Route path="/offer/:id" element={<Offer />} />
		<Route path="*" element={<Error404 />} />
	  </Routes>
	</BrowserRouter>
  </UserContextProvider>
);