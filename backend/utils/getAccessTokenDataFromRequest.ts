import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {isNotNilOrEmpty} from 'ramda-adjunct';
import {object, string} from 'yup';

export type TokenPayload = {userId: string; username: string};
type TokenData = {isValid: boolean; data: TokenPayload};

export const getAccessTokenDataFromRequest = (req: Request, res: Response): TokenData => {
  try {
    const token = req.headers.authorization?.split(' ')[1] ?? '';
    const payload = jwt.verify(token, process.env.ACCESS_KEY);

    const data = tokenDataSchema.cast(payload);
    const isValid = isNotNilOrEmpty(data);

    return {isValid, data};
  } catch (error) {
    throw res.status(401).json({error: 'Unauthorized'});
  }
};

const tokenDataSchema = object({
  userId: string().required(),
  username: string().required(),
});
