import {createSystem, defaultConfig} from '@chakra-ui/react';

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

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        'text-primary': {value: '#001141'},
        'text-secondary': {value: '#4D5667'},
        'text-tertiary': {value: '#7A869A'},
        'text-white': {value: '#FFFFFF'},
        'text-danger': {value: '#B71C1C'},

        'fill-brand': {value: '#0F62FE'},
        'fill-brand-hover': {value: '#0043CE'},
        'fill-darkBlue': {value: '#001141'},
        'fill-gray': {value: '#F1F2F6'},
        'fill-gray-hover': {value: '#E6E8EF'},
        'fill-gray-lightest': {value: '#F1F2F6'},
        'fill-white': {value: '#FFFFFF'},

        'border-brand': {value: '#0F62FE'},
        'border-gray': {value: '#CAD1DE'},
        'border-danger': {value: '#E32C1E'},
      },
      fontSizes: {
        'heading.1': {value: fontSizes.heading[1]},
        'heading.2': {value: fontSizes.heading[2]},
        'heading.3': {value: fontSizes.heading[3]},
        'text.base': {value: fontSizes.text.base},
        'text.small': {value: fontSizes.text.small},
      },
      fontWeights: {
        'heading.1': {value: fontWeights.heading[1]},
        'heading.2': {value: fontWeights.heading[2]},
        'heading.3': {value: fontWeights.heading[3]},
        'text.base': {value: fontWeights.text.base},
        'text.alternative': {value: fontWeights.text.alternative},
      },
    },
    recipes: {
      button: {
        base: {
          bg: 'unset',
          backgroundColor: '#0F62FE',
          color: '#FFFFFF',
          borderRadius: '100px',
        },
      },
    },
  },
});

export default theme;
