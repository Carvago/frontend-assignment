'use client';

import {createContext, useContext, useEffect, useState, ReactNode} from 'react';

import {getCurrentUser} from '@/api/user';
import type {CurrentUser} from '@/types';

type UserContextValue = {
  user: CurrentUser | null;
};

const UserContext = createContext<UserContextValue>({user: null});

export function UserProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => null);
  }, []);

  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  return useContext(UserContext);
}
