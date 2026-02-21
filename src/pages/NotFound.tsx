import {Box, Heading, Image, Text, VStack} from '@chakra-ui/react';
import {Link} from '@tanstack/react-router';
import logoUrl from '../assets/logo.svg';
import {RiArrowLeftLine} from 'react-icons/ri';
import {useTranslation} from 'react-i18next';
import {Button, Card} from '../components';
import {spacing} from '../design-system/spacing';

export function NotFound() {
  const {t} = useTranslation();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="fill-gray"
      padding={spacing.page}
    >
      <Card
        as={VStack}
        gap={spacing.stackCard}
        align="center"
        maxWidth="640px"
        padding={spacing.card}
      >
        <Box display="flex" alignItems="center" gap={spacing.inlineTight}>
          <Image src={logoUrl} alt="" width="37px" height="32px" />
          <Text fontSize="24px" fontWeight="600" color="text-primary" letterSpacing="-0.02em">
            Zentask
          </Text>
        </Box>

        <Heading fontSize="heading.1" color="text-secondary" textAlign="center">
          {t('notFound.title')}
        </Heading>

        <Text fontSize="text.base" color="text-secondary" lineHeight="1.5">
          {t('notFound.subtitle')}
        </Text>

        <Button asChild>
          <Link to="/">
            <RiArrowLeftLine />
            {t('notFound.goBack')}
          </Link>
        </Button>
      </Card>
    </Box>
  );
}
