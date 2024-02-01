import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheStore: Cache) {}

  public async getCache(key: string): Promise<unknown> {
    return await this.cacheStore.get(key);
  }

  public async setCache(key: string, value: string): Promise<void> {
    return await this.cacheStore.set(key, value);
  }
}
