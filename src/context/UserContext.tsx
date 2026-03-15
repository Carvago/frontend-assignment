'use client';

import {createContext, useContext, ReactNode} from 'react';

import type {CurrentUser} from '@/types';

type UserContextValue = {
  user: CurrentUser | null;
};

const UserContext = createContext<UserContextValue>({user: null});

export function UserProvider({children, initialUser}: {children: ReactNode; initialUser: CurrentUser | null}) {
  const user = initialUser;

  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  return useContext(UserContext);
}
