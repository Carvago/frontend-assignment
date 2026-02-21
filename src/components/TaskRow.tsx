import {useRef, useState} from 'react';
import {Box, Flex, HStack, Heading, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {RiPencilFill} from 'react-icons/ri';
import {MdDelete} from 'react-icons/md';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {Checkbox, ConfirmDialog, MenuButton, PopupMenu} from './index';
import type {Task} from '../types/task';
import {spacing} from '../design-system/spacing';

export interface TaskRowProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const DELETE_CLICK_IGNORE_MS = 300;

export function TaskRow({task, onToggle, onDelete, onEdit}: TaskRowProps) {
  const {t} = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const ignoreRowClickRef = useRef(false);

  const openDeleteDialog = () => {
    ignoreRowClickRef.current = true;
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      window.setTimeout(() => {
        ignoreRowClickRef.current = false;
      }, DELETE_CLICK_IGNORE_MS);
    }
  };

  const handleRowClick = () => {
    if (ignoreRowClickRef.current) return;
    onEdit();
  };

  const threeDotsTrigger = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="32px"
      height="32px"
      borderRadius="100px"
      color="text-primary"
      _hover={{backgroundColor: 'fill-white'}}
      transition="background-color 0.2s ease"
      aria-label={t('task.edit')}
    >
      <BsThreeDotsVertical size={16} />
    </Box>
  );

  return (
    <Flex
      alignItems="flex-start"
      gap={spacing.inlineTight}
      paddingX={spacing.inline}
      paddingY={spacing.inline}
      borderRadius="8px"
      cursor="pointer"
      backgroundColor="transparent"
      _hover={{
        backgroundColor: 'fill-gray-lightest',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
      transition="background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease"
      onClick={handleRowClick}
    >
      <Box
        marginTop={spacing.label}
        flexShrink={0}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Checkbox checked={task.completed} onChange={onToggle} aria-label={task.title} />
      </Box>
      <Box flex="1" minWidth={0} marginTop={spacing.inline}>
        <Heading
          as="h3"
          fontSize="heading.3"
          fontWeight="heading.3"
          color="text-primary"
          lineHeight="24px"
        >
          {task.title}
        </Heading>
        {task.description ? (
          <Text
            fontSize="text.small"
            color="text-tertiary"
            marginTop={spacing.label}
            lineHeight="1.5"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {task.description}
          </Text>
        ) : null}
      </Box>
      <Box onClick={(e: React.MouseEvent) => e.stopPropagation()} display="inline-block">
        <PopupMenu trigger={threeDotsTrigger} placement="bottom-end">
          {(close) => (
            <>
              <MenuButton
                onClick={() => {
                  close();
                  onEdit();
                }}
              >
                <HStack gap={spacing.inline}>
                  <RiPencilFill size={18} />
                  <Text color="text-primary" fontSize="text.small">
                    {t('task.edit')}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuButton
                onClick={() => {
                  close();
                  openDeleteDialog();
                }}
                color="text-danger"
                _hover={{backgroundColor: 'fill-gray', color: 'text-danger'}}
              >
                <HStack gap={2} color="text-danger">
                  <MdDelete size={18} />
                  <Text color="text-danger" fontSize="text.small">
                    {t('task.delete')}
                  </Text>
                </HStack>
              </MenuButton>
            </>
          )}
        </PopupMenu>
      </Box>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        title={t('task.deleteConfirmTitle')}
        description={t('task.deleteConfirmMessage')}
        confirmLabel={t('task.delete')}
        cancelLabel={t('dialog.cancel')}
        variant="danger"
        onConfirm={onDelete}
      />
    </Flex>
  );
}
