import jwt from 'jsonwebtoken';

export const signRefreshToken = (userId: string, username: string) => {
  const refreshToken = jwt.sign({username, userId}, process.env.REFRESH_KEY, {
    expiresIn: process.env.REFRESH_KEY_EXPIRES_IN,
  });

  return refreshToken;
};
