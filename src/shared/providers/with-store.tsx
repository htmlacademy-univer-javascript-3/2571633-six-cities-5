import MockAdapter from 'axios-mock-adapter';
import { RootState } from '../lib/types';
import { $api } from '../api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../lib';
import { Provider } from 'react-redux';
import { withStoreProviderType } from './types';

export function withStore(component: JSX.Element, initialState: Partial<RootState> = {}): withStoreProviderType {
  const mockAxiosAdapter = new MockAdapter($api);
  const middleware = [thunk.withExtraArgument($api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  const store = mockStoreCreator(initialState);

  return {
    withStoreComponent: (<Provider store={store}>{component}</Provider>),
    mockAxiosAdapter,
    mockStore: store
  };
}
