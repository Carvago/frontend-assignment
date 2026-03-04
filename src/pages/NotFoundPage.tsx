import {Link} from 'react-router-dom';
import {Center, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {PATHS} from '../routes/paths';

export const NotFoundPage = () => {
  const {t} = useTranslation();

  return (
    <Center h="100vh" bg="fill-gray">
      <VStack gap="16px">
        <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary">
          404
        </Text>
        <Text fontSize="text.base" color="text-secondary">
          {t('error.notFound')}
        </Text>
        <Text asChild color="fill-brand" fontSize="text.small">
          <Link to={PATHS.OVERVIEW}>{t('error.goHome')}</Link>
        </Text>
      </VStack>
    </Center>
  );
};
