import jwt from 'jsonwebtoken';

export const signAccessToken = (userId: string, username: string) => {
  const accessToken = jwt.sign({username, userId}, process.env.ACCESS_KEY, {
    expiresIn: '30min',
  });

  return accessToken;
};
