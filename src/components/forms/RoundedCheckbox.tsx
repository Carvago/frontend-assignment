import {Checkbox, CheckboxProps} from '@chakra-ui/react';
import {CheckIcon} from '../icons';

function CustomIcon(props: CheckboxProps) {
  const {isChecked} = props;

  return <>{isChecked ? <CheckIcon /> : null}</>;
}

export const RoundCheckbox = ({isChecked, onChange}: CheckboxProps) => (
  <Checkbox
    isChecked={isChecked}
    onChange={onChange}
    icon={<CustomIcon />}
    size="lg"
    borderRadius="full"
    sx={{
      '& .chakra-checkbox__control': {
        w: '32px',
        h: '32px',
        borderRadius: '50%',
        borderColor: 'border-gray',
      },
      '& .chakra-checkbox__control[data-checked]': {
        bg: 'fill-brand',
        borderColor: 'fill-brand',
        color: 'white',
      },
      '& svg': {
        width: '18px',
        height: '18px',
        fill: 'white',
      },
    }}
  />
);
