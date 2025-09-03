import {type PropsWithChildren} from 'react';
import {useAuthStore} from '../store/useAuthStore';
import {Center, Spinner} from '@chakra-ui/react';

const StartWrapper = ({children}: PropsWithChildren) => {
  const {isLoading} = useAuthStore();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  return children;
};

export default StartWrapper;
