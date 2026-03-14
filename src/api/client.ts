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
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      const refreshToken = Cookies.get('refreshToken');

      if (refreshToken) {
        try {
          const {data} = await axios.post<{accessToken: string}>(
            'http://localhost:3001/api/refresh-token',
            {refreshToken},
          );

          Cookies.set('token', data.accessToken, {sameSite: 'strict'});
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return client(originalRequest);
        } catch {
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }

      Cookies.remove('token');
      Cookies.remove('refreshToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }

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
