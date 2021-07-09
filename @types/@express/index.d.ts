import { User } from '../../src/components/user/model/User.entity';

declare global {
  namespace Express {
    interface Request {
      cookies: { 'connect.sid': string };
      user: User;
    }
  }
}
