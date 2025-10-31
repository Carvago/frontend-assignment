import jwt from 'jsonwebtoken';

export const signRefreshToken = (userId: string, username: string) => {
  const refreshToken = jwt.sign({username, userId}, process.env.REFRESH_KEY as string, {
    expiresIn: '8h',
  });

  return refreshToken;
};
