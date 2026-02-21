import {createSystem, defaultConfig} from '@chakra-ui/react';

const fontSizes = {
  heading: {
    1: '24px',
    2: '20px',
    3: '18px',
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
      fonts: {
        body: {value: "'Inter', sans-serif"},
        heading: {value: "'Inter', sans-serif"},
      },
      colors: {
        'text-primary': {value: '#001141'},
        'text-secondary': {value: '#4D5667'},
        'text-tertiary': {value: '#7A869A'},
        'text-white': {value: '#FFFFFF'},
        'text-danger': {value: '#B71C1C'},

        'fill-brand': {value: '#0F62FE'},
        'fill-brand-hover': {value: '#0043CE'},
        'fill-darkBlue': {value: '#001141'},
        'fill-gray-hover': {value: '#E6E8EF'},
        'fill-gray': {value: '#F1F2F6'},
        'fill-danger': {value: '#B71C1C'},
        'fill-danger-hover': {value: '#911111'},
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
        // Chakra Heading size="4xl" etc. use these tokens via textStyle
        xs: {value: '0.75rem'},
        sm: {value: '0.875rem'},
        md: {value: '1rem'},
        lg: {value: '1.125rem'},
        xl: {value: '1.25rem'},
        '2xl': {value: '1.5rem'},
        '3xl': {value: '1.875rem'},
        '4xl': {value: '2.25rem'},
        '5xl': {value: '3rem'},
        '6xl': {value: '3.75rem'},
        '7xl': {value: '4.5rem'},
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
          height: '40px',
          _hover: {backgroundColor: 'fill-brand-hover'},
        },
      },
    },
  },
});

export default theme;
