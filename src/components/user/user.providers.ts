import { Connection, Repository } from 'typeorm';
import { User } from './model/User.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection): Repository<User> =>
      connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
