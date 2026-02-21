import type {Preview} from '@storybook/react';
import {ChakraProvider} from '@chakra-ui/react';
import {I18nextProvider} from 'react-i18next';
import React from 'react';
import theme from '../src/theme';
import i18n from '../src/i18n/i18n';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={theme}>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </ChakraProvider>
    ),
  ],
};

export default preview;
