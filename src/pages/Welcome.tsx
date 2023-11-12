import {Card, Center, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

export function Welcome() {
  const {t} = useTranslation();

  return (
    <Center bg="whiteAlpha.800" height="100vh" width="100wv" padding="10">
      <Card colorScheme="whatsapp" variant="outline" padding="10">
        <Text bg="white" fontSize="2xl" color="blue.900">
          {t('welcome.message')}
        </Text>
      </Card>
    </Center>
  );
}
