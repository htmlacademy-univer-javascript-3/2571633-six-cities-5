import { MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

export type withStoreProviderType = {
    withStoreComponent: JSX.Element;
    mockAxiosAdapter: MockAdapter;
    mockStore: MockStore;
}
