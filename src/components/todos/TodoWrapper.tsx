import {PropsWithChildren} from 'react';
import {Card} from '../Card';
import {TodoHeader} from './TodoHeader';

export function TodoWrapper({children}: PropsWithChildren) {
  return (
    <Card>
      <TodoHeader />
      {children}
    </Card>
  );
}
