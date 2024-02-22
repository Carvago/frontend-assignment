import express, {Request, Response} from 'express';
import {isNil} from 'ramda';
import {match} from 'ts-pattern';
import {Todo, todoDB} from '../database/todos';
import {putResponseHandler} from '../handlers/putResponseHandler';
import {postResponseHandler} from '../handlers/postResponseHandler';
import {deleteResponseHandler} from '../handlers/deleteResponseHandler';
import {authenticateToken} from '../utils/verifyAccessToken';
import {getAccessTokenDataFromRequest} from '../utils/getAccessTokenDataFromRequest';
import {parseNewTodo} from '../utils/parseNewTodo';
import {validateTodoIdFromParams} from '../validators/validateTodoIdFromParams';

const todoRoutes = express.Router();

todoRoutes.get('/api/todo/list', authenticateToken, (req: Request, res: Response) => {
  const {data} = getAccessTokenDataFromRequest(req, res);
  todoDB.find({userId: data.userId}, (error: Error | null, todos: Todo[]) =>
    match(isNil(error))
      .with(true, () => res.status(200).json({todos}))
      .otherwise(() => res.status(500).json({error: 'Internal Server Error'}))
  );
});

todoRoutes.get('/api/todo/:id', authenticateToken, (req: Request, res: Response) => {
  const todoId = validateTodoIdFromParams(req, res);
  const {data} = getAccessTokenDataFromRequest(req, res);

  todoDB.findOne({id: todoId, userId: data.userId}, (error: Error | null, todo: Todo) =>
    match(isNil(error))
      .with(true, () => res.status(200).json(todo))
      .otherwise(() => res.status(500).json({error: 'Internal Server Error'}))
  );
});

todoRoutes.post('/api/todo', authenticateToken, (req: Request, res: Response<Todo>) => {
  const newTodo = parseNewTodo(req.body, req, res);

  todoDB.insert(newTodo, postResponseHandler(res));
});

todoRoutes.delete('/api/todo/:id', authenticateToken, (req: Request, res: Response) => {
  const todoId = validateTodoIdFromParams(req, res);
  const {data} = getAccessTokenDataFromRequest(req, res);

  todoDB.remove({id: todoId, userId: data.userId}, {multi: false}, deleteResponseHandler(res));
});

todoRoutes.put('/api/todo/:id', authenticateToken, (req: Request, res: Response) => {
  const todoId = validateTodoIdFromParams(req, res);
  const {data} = getAccessTokenDataFromRequest(req, res);

  const updatedTodo = parseNewTodo({...req.body, id: todoId}, req, res);

  todoDB.update(
    {id: todoId, userId: data.userId},
    {$set: updatedTodo},
    {},
    putResponseHandler(res)
  );
});

todoRoutes.post('/api/todo/:id/complete', authenticateToken, (req: Request, res: Response) => {
  const todoId = validateTodoIdFromParams(req, res);
  const {data} = getAccessTokenDataFromRequest(req, res);

  todoDB.update(
    {id: todoId, userId: data.userId},
    {$set: {completed: true}},
    {},
    putResponseHandler(res)
  );
});

todoRoutes.post('/api/todo/:id/incomplete', authenticateToken, (req: Request, res: Response) => {
  const todoId = validateTodoIdFromParams(req, res);
  const {data} = getAccessTokenDataFromRequest(req, res);

  todoDB.update(
    {id: todoId, userId: data.userId},
    {$set: {completed: false}},
    {},
    putResponseHandler(res)
  );
});

export default todoRoutes;
