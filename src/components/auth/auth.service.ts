import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  async setDataToRedis(key: string, value: string): Promise<string | null> {
    return 'OK';
  }

  async getDataFromRedis(key: string): Promise<string | null> {
    return 'OK';
  }

  async removeDataFromRedis(key: string): Promise<void> {}
}
