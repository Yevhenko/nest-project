import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces';
import { env } from '@config/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@components/user/models/User';
import { createQueryBuilder, Repository } from 'typeorm';
import { compare, hash } from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(data: IUser): Promise<IUser> {
    const user = await this.userRepository.create(data);

    return await this.userRepository.save(user);
  }

  async getUserByLogin(login: string): Promise<IUser | undefined> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async getUsersFromDb(offset: number, limit: number): Promise<IUser[]> {
    return await createQueryBuilder(User).skip(offset).take(limit).getMany();
  }

  async getUserByIdFromDb(id: number | undefined): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new Error('no user');

    return user;
  }
  async createHashedPassword(password: string): Promise<string> {
    return await hash(password, env.SALT);
  }

  async compareHashedPasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
