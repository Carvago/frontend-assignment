import {Box, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {Button} from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Box
      minH="100vh"
      bg="fill-gray"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="6"
      p="4"
    >
      <Box display="flex" alignItems="center" gap="2">
        <img src="/logo.svg" alt="Zentask logo" width={48} />
        <Text fontSize="heading.3" fontWeight="heading.2" color="text-primary">
          Zentask
        </Text>
      </Box>

      <Box
        bg="fill-white"
        borderRadius="16px"
        p="10"
        width="100%"
        maxW="460px"
        boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="4"
        textAlign="center"
      >
        <Text fontSize="heading.1" fontWeight="heading.1" color="text-primary">
          404
        </Text>
        <Text fontSize="heading.2" fontWeight="heading.2" color="text-primary">
          Page not found
        </Text>
        <Text fontSize="text.base" color="text-secondary">
          The page you are looking for doesn't exist or has been moved.
        </Text>

        <Link href="/todos">
          <Button variant="solid">Go to my todos</Button>
        </Link>
      </Box>
    </Box>
  );
}
