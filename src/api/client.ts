import axios, {AxiosError} from 'axios';
import Cookies from 'js-cookie';

import {toaster} from '@/components/ui/toaster';

type ApiErrorResponse = {
  error?: string;
};

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.error ?? 'Something went wrong';

    toaster.create({
      title: 'Error',
      description: message,
      type: 'error',
    });

    return Promise.reject(error);
  },
);

export default client;
