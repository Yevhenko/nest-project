import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('/sign-up')
  async signUp(
    @Body() body,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const { session, sessionID } = req;
    const { firstName, lastName, isActive } = body;

    const existingUser = await this.userService.finUserByLogin(firstName);

    if (existingUser) {
      return res.status(403).send('User already exists');
    } else {
      const user = await this.userService.createUser({
        firstName,
        lastName,
        isActive,
      });
      session.userId = user.id;
      await this.authService.setDataToRedis(sessionID, JSON.stringify(session));

      res.cookie('connect.sid', sessionID);

      return res.json({ id: user.id, login: user.firstName });
    }
  }
  @Post('/sign-in')
  async signIn(
    @Body() body,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const { session, sessionID } = req;
    const { firstName, lastName } = body;

    const user = await this.userService.finUserByLogin(firstName);

    if (!user) return res.status(403).send('Login or password mismatch');

    if (lastName !== user.lastName) {
      return res.status(403).send('Login or password mismatch');
    } else {
      session.userId = user.id;
      await this.authService.setDataToRedis(sessionID, JSON.stringify(session));
      res.cookie('connect.sid', sessionID);

      return res.sendStatus(200);
    }
  }
}
