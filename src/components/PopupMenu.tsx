import {Box} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useEffect, useRef, useState, type ReactNode} from 'react';

export interface PopupMenuProps {
  /** Content that opens the menu when clicked */
  trigger: ReactNode;
  /** Menu content, or render function that receives close() to close the menu */
  children: ReactNode | ((close: () => void) => ReactNode);
  /** Placement of the menu relative to trigger */
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';
  /** Called when menu closes (e.g. after selecting an item) */
  onClose?: () => void;
}

export function PopupMenu({trigger, children, placement = 'bottom-end', onClose}: PopupMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  const close = () => {
    setOpen(false);
    onClose?.();
  };

  const positionStyles =
    placement === 'bottom-end'
      ? {top: '100%', right: 0, marginTop: 4}
      : placement === 'bottom-start'
        ? {top: '100%', left: 0, marginTop: 4}
        : placement === 'top-end'
          ? {bottom: '100%', right: 0, marginBottom: 4}
          : {bottom: '100%', left: 0, marginBottom: 4};

  return (
    <Box ref={ref} position="relative" display="inline-block">
      <Box
        display="inline-block"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        role="button"
        tabIndex={0}
        cursor="pointer"
      >
        {trigger}
      </Box>
      {open && (
        <Box
          position="absolute"
          {...positionStyles}
          minWidth="160px"
          backgroundColor="fill-white"
          borderRadius="8px"
          boxShadow="0 4px 12px rgba(0,0,0,0.15)"
          zIndex={10}
          role="menu"
        >
          <motion.div
            initial={{opacity: 0, scale: 0.96}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.15, ease: 'easeOut'}}
          >
            {typeof children === 'function' ? children(close) : children}
          </motion.div>
        </Box>
      )}
    </Box>
  );
}
