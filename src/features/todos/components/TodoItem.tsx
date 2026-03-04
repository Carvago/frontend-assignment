import {useNavigate} from 'react-router-dom';
import {Box, Flex, Text} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {Checkbox} from '../../../components/ui/Checkbox';
import {QuickActions} from './QuickActions';
import {editTaskPath} from '../../../routes/paths';
import type {TodoResponse} from '../../../api/generated';

type TodoItemProps = {
  todo: TodoResponse;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export const TodoItem = ({todo, onToggle, onDelete}: TodoItemProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      data-testid="todo-item"
      layout
      initial={{opacity: 0, y: 8}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, x: -20}}
      transition={{duration: 0.2}}
    >
      <Flex align="flex-start" gap={3} py={3}>
        <Box pt="2px">
          <Checkbox checked={todo.completed} onChange={(checked) => onToggle(todo.id, checked)} />
        </Box>
        <Box flex="1" cursor="pointer" onClick={() => navigate(editTaskPath(todo.id))} minW="0">
          <Text fontWeight="heading.3" fontSize="heading.3" color="text-primary" lineHeight="28px">
            {todo.title}
          </Text>
          {todo.description && (
            <Text fontSize="text.base" color="text-tertiary" lineHeight="24px" lineClamp={2}>
              {todo.description}
            </Text>
          )}
        </Box>
        <QuickActions
          onEdit={() => navigate(editTaskPath(todo.id))}
          onDelete={() => onDelete(todo.id)}
        />
      </Flex>
    </motion.div>
  );
};
