import {Response, Request} from 'express';
import {Todo} from '../database/todos';
import {object, string, boolean} from 'yup';
import {getAccessTokenDataFromRequest} from './getAccessTokenDataFromRequest';
import {v4 as uuid} from 'uuid';

export const parseNewTodo = (todo: Record<string, unknown>, req: Request, res: Response): Todo => {
  try {
    const {data} = getAccessTokenDataFromRequest(req, res);
    const newTodo = {
      ...todo,
      id: uuid(),
      userId: data.userId,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    return todoSchema.validateSync(newTodo);
  } catch (error) {
    throw res.status(400).json({error});
  }
};

const todoSchema = object({
  id: string().required(),
  title: string().required(),
  description: string().required(),
  createdAt: string().required(),
  completed: boolean().required(),
  userId: string().required(),
});
