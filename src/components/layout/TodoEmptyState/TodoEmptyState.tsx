'use client';

import {Box, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

export function TodoEmptyState() {
  const {t} = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="3" py="10">
      <img src="/logo.svg" alt="empty" width={80} />
      <Text fontSize="heading.3" fontWeight="heading.2" color="text-primary">
        {t('todoEmpty.title')}
      </Text>
      <Text fontSize="text.base" color="text-secondary">
        {t('todoEmpty.subtitle')}
      </Text>
    </Box>
  );
}
