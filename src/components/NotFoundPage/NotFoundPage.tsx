import {Link} from 'react-router-dom';

import { AppRoute } from '../../types/types';
import { AuthorizationStatus } from '../../const.ts';
import { getAuthStatus,getUserEmail} from '../../store/userselector.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/index.tsx';
import { logout } from '../../api-actions.ts';
function NotFoundPage():JSX.Element{
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getUserEmail);
  const authStatus = useAppSelector(getAuthStatus);

  return(
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">

              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>

            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Main}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {userEmail}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  {
                    authStatus === AuthorizationStatus.Auth ?

                      <Link className="header__nav-link" to = '/'>
                        <span className="header__signout"
                          onClick={(evt) => {
                            evt.preventDefault();
                            dispatch(logout());
                          }}
                        >Sign out
                        </span>
                      </Link> :

                      <Link className="header__nav-link" to = {AppRoute.Login}>
                        <span className="header__signout"> Sign in</span>
                      </Link>
                  }

                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <h2 style={{ textAlign : 'center'}}>404 Not Found<Link to = "/"> Return to main page</Link></h2>

          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </main>
    </div>
  );
}
export default NotFoundPage;
