import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {isNil, isNotNil} from 'ramda';
import {isNilOrEmpty} from 'ramda-adjunct';
import {v4 as uuid} from 'uuid';
import {User, userDB} from '../database/users';
import {validateCredentialsFromBody} from '../validators/validateCredentialsFromBody';
import {signAccessToken} from '../utils/signAccessToken';
import {signRefreshToken} from '../utils/signRefreshToken';
import {hashPassword} from '../utils/hashPassword';
import {comparePassword} from '../utils/comparePassword';

const userRoutes = express.Router();

userRoutes.post('/api/register', (req: Request, res: Response) => {
  const {password, username} = validateCredentialsFromBody(req, res);
  const hashedPassword = hashPassword(password);

  userDB.findOne({username}, (err: Error | null, user: User) => {
    if (isNotNil(err)) return res.status(500).json({error: 'Internal server error'});
    if (isNotNil(user)) return res.status(400).json({error: 'Username is already taken'});

    const newUser: User = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      username,
      password: hashedPassword,
    };

    userDB.insert(newUser);

    const accessToken = signAccessToken(newUser.id, username);
    const refreshToken = signRefreshToken(newUser.id, username);

    res.status(201).json({accessToken, refreshToken});
  });
});

userRoutes.post('/api/login', (req: Request, res: Response) => {
  const {password, username} = validateCredentialsFromBody(req, res);

  userDB.findOne(
    (user: User) => user.username === username && comparePassword(password, user.password),
    (err: Error | null, user: User | null) => {
      if (isNotNil(err)) return res.status(500).json({error: 'Internal server error'});
      if (isNil(user)) return res.status(401).json({error: 'Invalid credential'});

      const accessToken = signAccessToken(user.id, username);
      const refreshToken = signRefreshToken(user.id, username);

      res.status(200).json({accessToken, refreshToken});
    }
  );
});

userRoutes.post('/api/refresh-token', (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (isNilOrEmpty(refreshToken)) {
    return res.status(400).json({error: "Refresh token can't be empty"});
  }

  jwt.verify(refreshToken, process.env.REFRESH_KEY, (err: any, user: any) => {
    if (err) return res.status(401).json({error: 'Invalid refresh token'});

    const accessToken = signAccessToken(user.userId, user.username);

    return res.json({accessToken});
  });
});

export default userRoutes;
