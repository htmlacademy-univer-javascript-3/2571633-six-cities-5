import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { DispatchFunc, RootState } from './types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { $api } from '../api';

export const useAppDispatch: DispatchFunc = useDispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, typeof $api, Action>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const compareDates = (dateString1: string, dateString2: string) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  if(!date1?.getDate() || !date2?.getDate()) {
    return 1;
  }
  if(date1 < date2) {
    return 1;
  }
  if(dateString1 === dateString2) {
    return 0;
  }
  return -1;
};
