import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const defaultTTL: number = 1800 * 60 * 20;
    const TTL_MS: number = ttl ? ttl * 60 * 1000 : defaultTTL;

    await this.cache.set(key, value, TTL_MS);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async clearAll(): Promise<void> {
    const client: any = (this.cache as any).store?.getClient?.();
    if (client?.flushAll) {
      await client.flushAll();
    } else {
      console.warn('Cannot flush cache: store is not Redis');
    }
  }
}
