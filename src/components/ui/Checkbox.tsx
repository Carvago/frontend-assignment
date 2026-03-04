import {chakra} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {Icon} from './Icon';

const CheckboxLabel = chakra('label');

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox = ({checked, onChange}: CheckboxProps) => (
  <CheckboxLabel
    w={6}
    h={6}
    minW={6}
    borderRadius="full"
    border={checked ? 'none' : '2px solid'}
    borderColor="border-gray"
    bg={checked ? 'fill-brand' : 'transparent'}
    display="flex"
    alignItems="center"
    justifyContent="center"
    cursor="pointer"
    transition="all 0.2s"
    p={0}
    _hover={{borderColor: checked ? undefined : 'fill-brand'}}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-checked={checked}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    />
    {checked && (
      <motion.div
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{type: 'spring', stiffness: 500, damping: 30}}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <Icon name="check" size={14} style={{color: 'white'}} />
      </motion.div>
    )}
  </CheckboxLabel>
);
