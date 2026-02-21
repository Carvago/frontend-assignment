import {Box, Flex, Heading, Image, Text, VStack} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import logoUrl from '../assets/logoBig.svg';
import {spacingScale} from '../design-system/spacing';

export function EmptyStateBlock() {
  const {t} = useTranslation();

  return (
    <Flex
      flex="1"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingY={{base: spacingScale[6], sm: spacingScale[8]}}
    >
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4, ease: 'easeOut'}}
      >
        <VStack gap={spacingScale[4]} maxWidth="320px" textAlign="center">
          <Box aria-hidden>
            <motion.div
              initial={{opacity: 0, scale: 0.88}}
              animate={{opacity: 1, scale: 1}}
              transition={{
                opacity: {duration: 0.35},
                scale: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 16,
                  delay: 0.08,
                },
              }}
            >
              <motion.div
                animate={{scale: [1, 1.04, 1]}}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: 'easeInOut',
                }}
              >
                <Image src={logoUrl} alt="" width="120px" height="104px" opacity={0.9} />
              </motion.div>
            </motion.div>
          </Box>
          <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, delay: 0.2}}
          >
            <Heading size="lg" color="text-primary" fontWeight="heading.2" lineHeight="1.3">
              {t('dashboard.emptyTitle')}
            </Heading>
          </motion.div>
          <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, delay: 0.3}}
          >
            <Text fontSize="text.base" color="text-secondary" lineHeight="1.5">
              {t('dashboard.emptyMessage')}
            </Text>
          </motion.div>
        </VStack>
      </motion.div>
    </Flex>
  );
}
