import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { cookies } = req;

    const sessionId = cookies['connect.sid'];

    if (!sessionId) {
      return res.status(401).json('no proper cookie');
    }
    const data = await this.authService.getDataFromRedis(sessionId);

    if (data !== null) {
      const session = JSON.parse(data);
      const user = await this.userService.findOneUser(session.userId);

      if (!user) return res.status(500).json('user not found');

      req.user = user;
      return next();
    }
    return res.status(401).json('invalid sign-in');
  }
}
