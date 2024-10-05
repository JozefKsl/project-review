import { Redis } from 'ioredis';
import { Cache } from './cache';

export class CacheImpl implements Cache {
    constructor(private cache: Redis) {}

    async get<T>(key: string): Promise<T | null> {
        const result = await this.cache.get(key);
        return result ? JSON.parse(result) : null;
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        const stringValue = JSON.stringify(value);
        if (ttl) {
            await this.cache.set(key, stringValue, 'EX', ttl);
        } else {
            await this.cache.set(key, stringValue);
        }
    }

    async del(key: string): Promise<void> {
        await this.cache.del(key);
    }

    async exists(key: string): Promise<boolean> {
        const exists = await this.cache.exists(key);
        return exists === 1;
    }
}
