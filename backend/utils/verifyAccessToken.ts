import {Request, Response} from 'express';
import {getAccessTokenDataFromRequest} from '../utils/getAccessTokenDataFromRequest';

export const authenticateToken = (req: Request, res: Response, next: () => void) => {
  const {isValid} = getAccessTokenDataFromRequest(req, res);

  if (!isValid) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  next();
};
