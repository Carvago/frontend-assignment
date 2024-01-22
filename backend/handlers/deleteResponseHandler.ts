import {Response} from 'express';
import {isNil} from 'ramda';
import {match} from 'ts-pattern';

export const deleteResponseHandler =
  (res: Response) => (error?: Error | null, numRemoved?: number) =>
    match([isNil(error), numRemoved])
      .with([true, 0], () => res.status(404).json({error: 'Todo not found'}))
      .with([true, 1], () => res.sendStatus(204))
      .otherwise(() => res.status(500).json({error: 'Internal Server Error'}));
