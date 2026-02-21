import {Dialog, HStack, Text} from '@chakra-ui/react';
import type {ComponentType, ReactNode} from 'react';
import {spacing} from '../design-system/spacing';

type WithChildren = ComponentType<{children?: ReactNode}>;
type WithChildrenAndProps = ComponentType<{children?: ReactNode; [key: string]: unknown}>;
const Positioner = Dialog.Positioner as WithChildren;
const Content = Dialog.Content as WithChildrenAndProps;
const Title = Dialog.Title as WithChildren;
import {Button} from './Button';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  /** Use for destructive actions (e.g. delete) */
  variant?: 'danger' | 'default';
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  cancelLabel = 'Cancel',
  variant = 'default',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e: {open: boolean}) => onOpenChange(e.open)}
      role="alertdialog"
      size="sm"
      closeOnInteractOutside={variant !== 'danger'}
    >
      <Dialog.Backdrop />
      <Positioner>
        <Content padding={spacing.field} marginTop={spacing.card} gap={spacing.section}>
          <Dialog.Header>
            <Title>{title}</Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text color="text-secondary" fontSize="text.base" lineHeight="1.5">
              {description}
            </Text>
          </Dialog.Body>
          <Dialog.Footer>
            <HStack gap={spacing.inlineTight} justifyContent="flex-end">
              <Button
                variant="ghost"
                onClick={handleCancel}
                _hover={{backgroundColor: 'fill-gray-hover'}}
                transition="background-color 0.2s ease"
              >
                {cancelLabel}
              </Button>
              <Button
                variant={'danger'}
                onClick={handleConfirm}
                transition="background-color 0.2s ease, color 0.2s ease"
              >
                {confirmLabel}
              </Button>
            </HStack>
          </Dialog.Footer>
        </Content>
      </Positioner>
    </Dialog.Root>
  );
}
