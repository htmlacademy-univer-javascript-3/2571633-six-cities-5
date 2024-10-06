import {FC} from 'react';
import { Navigate } from 'react-router-dom';
import { WithChildren } from '../../shared/interfaces';
import { useUserContext } from '../User';

export const LoggedRoute:FC<WithChildren> = ({ children }) => {
  const { user } = useUserContext();

  return user.logged ? children : <Navigate to={'/LoginPage'} />;
};
