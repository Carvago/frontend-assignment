export const checkboxBase = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'box-shadow 0.15s ease',
};

export const checkboxUnchecked = {
  ...checkboxBase,
  bg: 'fill-white',
  border: '2px solid',
  borderColor: 'border-gray',
  _hover: {
    boxShadow: '0 0 0 4px rgba(15, 98, 254, 0.2)',
    borderColor: 'border-brand',
  },
};

export const checkboxChecked = {
  ...checkboxBase,
  bg: 'fill-brand',
  border: 'none',
  _hover: {
    boxShadow: '0 0 0 4px rgba(15, 98, 254, 0.2)',
  },
};
