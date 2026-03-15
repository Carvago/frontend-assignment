'use client';

import {Box, Dialog, Portal, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/Button';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDialogProps) {
  const {t} = useTranslation();

  return (
    <Dialog.Root open={open} onOpenChange={({open}) => !open && onCancel()} role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="16px" p="6" maxW="400px">
            <Dialog.Title>
              <Text fontSize="heading.3" fontWeight="heading.2" color="text-primary">
                {title}
              </Text>
            </Dialog.Title>

            {description && (
              <Dialog.Description mt="2">
                <Text fontSize="text.base" color="text-secondary">
                  {description}
                </Text>
              </Dialog.Description>
            )}

            <Box display="flex" justifyContent="flex-end" gap="3" mt="6">
              <Button variant="subtle" onClick={onCancel} disabled={isLoading}>
                {t('common.cancel')}
              </Button>
              <Button variant="solid" onClick={onConfirm} disabled={isLoading}>
                {confirmLabel ?? t('common.delete')}
              </Button>
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
