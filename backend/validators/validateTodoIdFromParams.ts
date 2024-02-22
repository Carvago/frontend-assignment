import {Response, Request} from 'express';
import {isNilOrEmpty} from 'ramda-adjunct';

export const validateTodoIdFromParams = (req: Request, res: Response): string => {
  const todoId = req.params.id;

  if (isNilOrEmpty(todoId)) {
    throw res.status(400).json({error: 'Todo id is required'});
  }

  return todoId;
};
