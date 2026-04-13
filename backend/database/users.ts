import Datastore from '@seald-io/nedb';

export type User = {username: string; password: string; createdAt: string; id: string};

export const userDB = new Datastore<User>({
  filename: 'backend/database/data/users.db',
  autoload: true,
});
