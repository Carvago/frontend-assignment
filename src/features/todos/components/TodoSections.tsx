import {Box, Flex, Text} from '@chakra-ui/react';
import {AnimatePresence} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {TodoItem} from './TodoItem';
import type {TodoResponse} from '../../../api/generated';

type TodoSectionsProps = {
  todos: TodoResponse[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export const TodoSections = ({todos, onToggle, onDelete}: TodoSectionsProps) => {
  const {t} = useTranslation();
  const pending = todos.filter((todo) => !todo.completed);
  const completed = todos.filter((todo) => todo.completed);

  return (
    <Flex direction="column" gap={6}>
      {pending.length > 0 && (
        <Box>
          <Box borderBottom="1px solid" borderColor="border-gray" pb={3} mb={2}>
            <Text fontWeight="heading.2" fontSize="heading.3" color="text-primary">
              {t('overview.section.todo')}
            </Text>
          </Box>
          <AnimatePresence>
            {pending.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </AnimatePresence>
        </Box>
      )}

      {completed.length > 0 && (
        <Box>
          <Box borderBottom="1px solid" borderColor="border-gray" pb={3} mb={2}>
            <Text fontWeight="heading.2" fontSize="heading.3" color="text-primary">
              {t('overview.section.completed')}
            </Text>
          </Box>
          <AnimatePresence>
            {completed.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </AnimatePresence>
        </Box>
      )}
    </Flex>
  );
};
