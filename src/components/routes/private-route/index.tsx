import {Navigate} from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { routesEnum } from '../../../shared/config';
import { AuthorizationStatus } from '../../../const';

interface IPrivateRoute extends PropsWithChildren{
  authState: AuthorizationStatus;
}
function PrivateRoute({children, authState}: IPrivateRoute) {
  return authState === AuthorizationStatus.Auth || authState === AuthorizationStatus.Unknown ? children : <Navigate to={routesEnum.LOGIN} />;
}

export default PrivateRoute;
