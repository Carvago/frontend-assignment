import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (userInputPassword: string) =>
  bcrypt.hashSync(userInputPassword, SALT_ROUNDS);
