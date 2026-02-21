import {randomUUID} from 'crypto';
import express, {Request, Response} from 'express';
import {isNil} from 'ramda';
import {match} from 'ts-pattern';
import {Todo, todoDB} from '../database/todos';
import {authenticateToken} from '../utils/verifyAccessToken';
import {getAccessTokenDataFromRequest} from '../utils/getAccessTokenDataFromRequest';

const router = express.Router();

/** Seed mock todos for performance testing. Must be registered before /api/todo/:id so "seed" is not treated as an id. */
router.post('/api/todo/seed', authenticateToken, (req: Request, res: Response) => {
  const {data} = getAccessTokenDataFromRequest(req, res);
  const count = Math.min(Math.max(1, Number(req.query.count) || 2000), 10000);
  const now = new Date().toISOString();
  const todos: Todo[] = Array.from({length: count}, (_, i) => ({
    id: randomUUID(),
    title: `Mock task ${i + 1}`,
    description: i % 3 === 0 ? `Description for task ${i + 1}` : undefined,
    createdAt: now,
    completed: i % 4 === 0,
    userId: data.userId,
  }));
  todoDB.insert(todos, (err: Error | null) =>
    match(isNil(err))
      .with(true, () => res.status(201).json({created: count}))
      .otherwise(() => res.status(500).json({error: 'Internal Server Error'}))
  );
});

export const seedTodoRoute = router;
