import bcrypt from 'bcrypt';

export const comparePassword = (userInputPassword: string, hashedPassword: string) =>
  bcrypt.compareSync(userInputPassword, hashedPassword);
