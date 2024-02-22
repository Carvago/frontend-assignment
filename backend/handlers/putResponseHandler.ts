import {Response} from 'express';
import {isNil} from 'ramda';
import {match} from 'ts-pattern';

export const putResponseHandler = (res: Response) => (error?: Error | null, numUpdated?: number) =>
  match([isNil(error), numUpdated])
    .with([true, 0], () => res.status(404).json({error: 'Todo not found'}))
    .with([true, 1], () => res.sendStatus(201))
    .otherwise(() => res.status(500).json({error: 'Internal Server Error'}));
