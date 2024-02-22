import jwt from 'jsonwebtoken';

export const signAccessToken = (userId: string, username: string) => {
  const accessToken = jwt.sign({username, userId}, process.env.ACCESS_KEY, {
    expiresIn: process.env.ACCESS_KEY_EXPIRES_IN,
  });

  return accessToken;
};
