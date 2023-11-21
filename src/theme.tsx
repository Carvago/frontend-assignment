import {extendTheme} from '@chakra-ui/react';

const fontSizes = {
  heading: {
    1: '28px',
    2: '24px',
    3: '20px',
  },
  text: {
    base: '16px',
    small: '14px',
  },
};

const fontWeights = {
  heading: {
    1: 700,
    2: 600,
    3: 500,
  },
  text: {
    base: 400,
    alternative: 500,
  },
};

const theme = extendTheme({
  config: {initialColorMode: 'light', useSystemColorMode: false},
  colors: {
    'text-primary': '#001141',
    'text-secondary': '#4D5667',
    'text-tertiary': '#7A869A',
    'text-white': '#FFFFFF',
    'text-danger': '#B71C1C',

    'fill-brand': '#0F62FE',
    'fill-brand-hover': '#0043CE',
    'fill-darkBlue': '#001141',
    'fill-gray': '#F1F2F6',
    'fill-gray-hover': '#E6E8EF',
    'fill-gray-lightest': '#F1F2F6',
    'fill-white': '#FFFFFF',

    'border-brand': '#0F62FE',
    'border-gray': '#CAD1DE',
    'border-danger': '#E32C1E',
  },
  components: {
    Button: {
      baseStyle: () => ({
        bg: 'unset',
        backgroundColor: '#0F62FE',
        color: '#FFFFFF',
        borderRadius: '100px',
      }),
    },
  },
  fontSizes,
  fontWeights,
});

export default theme;
