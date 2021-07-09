import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/User.entity';
import { IUser } from './interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(data: IUser): Promise<IUser> {
    return await this.usersRepository.create(data);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneUser(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async finUserByLogin(login: string): Promise<User> {
    return await this.usersRepository.findOne(login);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
