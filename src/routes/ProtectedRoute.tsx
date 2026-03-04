import {Navigate, Outlet} from 'react-router-dom';
import {Center, Spinner} from '@chakra-ui/react';
import {useAuth} from '../providers/AuthProvider';
import {PATHS} from './paths';

export const ProtectedRoute = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="fill-brand" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};
