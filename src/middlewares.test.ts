import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';

import { redirect } from './middlewares';
import { RootState } from './shared/lib/types';
import browserHistory from './config';
import { routesEnum } from './shared/config';
import { AppRoute } from './types/types';
import { redirectToRoute } from './action';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<RootState, AnyAction>(
      middleware
    );
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: routesEnum.MAIN };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(routesEnum.MAIN);
  });
});
