import client from './client';

import type {CurrentUser} from '@/types';

export async function getCurrentUser(): Promise<CurrentUser> {
  const {data} = await client.get<CurrentUser>('/user/me');
  return data;
}
