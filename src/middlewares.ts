import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import browserHistory from './config';
import { ReducerType } from './types/types';

export const redirect: Middleware<unknown, ReducerType> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'user/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
