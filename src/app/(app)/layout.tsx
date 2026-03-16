import {Box} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {cookies} from 'next/headers';

import {UserProvider} from '@/context/UserContext';
import type {CurrentUser} from '@/types';

async function getUser(): Promise<CurrentUser | null> {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.API_URL ?? 'http://localhost:3001/api'}/user/me`, {
      headers: {Authorization: `Bearer ${token}`},
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AppLayout({children}: {children: ReactNode}) {
  const user = await getUser();

  return (
    <UserProvider initialUser={user}>
      <Box as="main" minH="100vh" bg="fill-gray" p="4">
        <Box maxW="1100px" mx="auto">
          {children}
        </Box>
      </Box>
    </UserProvider>
  );
}
