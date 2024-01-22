import {Request, Response} from 'express';
import {isString} from 'ramda-adjunct';

export const validateCredentialsFromBody = (req: Request, res: Response) => {
  const {username, password} = req.body;

  if (isString(username) && isString(password)) {
    return {username, password};
  }

  throw res.status(400).json({error: 'Username and password are required'});
};
