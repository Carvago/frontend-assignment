import {VStack, Heading, Divider} from '@chakra-ui/react';
import {TodoItem} from './TodoItem';
import {TodoListResponse} from '../../api/client';
import {TodosEmpty} from './TodosEmpty';

type Props = {
  todos: TodoListResponse;
};

export function TodoList({todos}: Props) {
  const todoItems = todos?.filter((todo) => !todo.completed) || [];
  const completedItems = todos?.filter((todo) => todo.completed) || [];

  return (
    <VStack spacing="24px" w="full" align="start">
      {todoItems.length > 0 ? (
        <VStack spacing="16px" w="full" align="start">
          <Heading size="3" color="text-primary">
            To Do ({todoItems.length})
          </Heading>
          <Divider borderColor="border-gray" />
          <VStack spacing="12px" w="full" align="start">
            {todoItems.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </VStack>
        </VStack>
      ) : (
        <TodosEmpty />
      )}

      {completedItems.length > 0 && (
        <VStack spacing="16px" w="full" align="start">
          <Heading size="3" color="text-secondary">
            Completed ({completedItems.length})
          </Heading>
          <Divider borderColor="border-gray" />
          <VStack spacing="12px" w="full" align="start">
            {completedItems.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
