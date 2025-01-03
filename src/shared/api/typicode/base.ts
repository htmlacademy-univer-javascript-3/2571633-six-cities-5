import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL, REQUEST_TIMEOUT } from '../../config';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getToken } from './token';
import { ErrorMessageType } from '../../types';

const BadStatusCodesArray: (StatusCodes | string)[] = [
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.BAD_GATEWAY,
  StatusCodes.INTERNAL_SERVER_ERROR,
  'ERR_NETWORK',
  'ERR_BAD_REQUEST',
  'ECONNABORTED',
];

export const $api = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  }
);

$api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorMessageType>) => {
    if (error.code && BadStatusCodesArray.includes(error.code)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      toast.warn('ERRORS WITH SERVER', {
        position: 'top-left',
        autoClose: 3000,
      });
    }
    throw error;
  }
);
