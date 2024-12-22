import MockAdapter from 'axios-mock-adapter';
import { api } from '../../api-actions';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../lib';
import { Provider } from 'react-redux';
import { withStoreProviderType } from './types';
import { State } from '../../types/types';

export function withStore(component: JSX.Element, initialState: Partial<State> = {}): withStoreProviderType {
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const store = mockStoreCreator(initialState);

  return {
    withStoreComponent: (<Provider store={store}>{component}</Provider>),
    mockAxiosAdapter,
    mockStore: store
  };
}
