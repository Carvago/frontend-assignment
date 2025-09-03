import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router';
import {useIsLoggedIn} from '../store/useIsLoggedIn';

export const ProtectedRoute = ({children}: PropsWithChildren) => {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
