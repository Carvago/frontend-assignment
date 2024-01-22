import {Response} from 'express';
import {isNil} from 'ramda';
import {match} from 'ts-pattern';

export const postResponseHandler = (res: Response) => (error?: any, data?: any) =>
  match(isNil(error))
    .with(true, () => res.status(201).json(data))
    .otherwise(() => res.status(500).json({error: 'Internal Server Error'}));
