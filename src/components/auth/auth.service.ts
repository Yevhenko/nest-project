import { Injectable } from '@nestjs/common';
import { redisClient as redis } from '@config/config';

@Injectable()
export class AuthService {
  async setDataToRedis(key: string, value: any): Promise<string | null> {
    return await redis.set(key, value);
  }
  async getDataFromRedis(key: string): Promise<string | null> {
    return await redis.get(key);
  }
  async removeDataFromRedis(key: string) {
    return await redis.del(key);
  }
  async removeAllDataFromRedis() {
    return await redis.flushall();
  }
}
