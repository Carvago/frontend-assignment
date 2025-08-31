import {Avatar as ChakraAvatar, HStack, Text} from '@chakra-ui/react';

interface AvatarProps {
  name: string;
  src?: string;
}

export const Avatar = ({name, src}: AvatarProps) => (
  <HStack spacing="2" alignItems="center">
    <ChakraAvatar name={name} src={src} size="xs" width="24px" height="24px" bg="gray.400" />
    <Text fontSize="text.base" fontWeight="text.base" color="text-primary">
      {name}
    </Text>
  </HStack>
);
