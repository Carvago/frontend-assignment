import {EmptyState as ChakraEmptyState, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import placeholderIcon from '../../assets/icons/icon-placeholder.svg';

export const EmptyState = () => {
  const {t} = useTranslation();

  return (
    <ChakraEmptyState.Root py={10}>
      <ChakraEmptyState.Content>
        <ChakraEmptyState.Indicator>
          <img src={placeholderIcon} alt="" width="150" height="130" />
        </ChakraEmptyState.Indicator>
        <VStack textAlign="center">
          <ChakraEmptyState.Title fontWeight="heading.2" fontSize="heading.2" color="text-primary">
            {t('overview.empty.title')}
          </ChakraEmptyState.Title>
          <ChakraEmptyState.Description fontSize="text.base" color="text-tertiary">
            {t('overview.empty.subtitle')}
          </ChakraEmptyState.Description>
        </VStack>
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  );
};
