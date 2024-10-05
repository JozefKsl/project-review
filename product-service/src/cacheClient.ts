import Redis from 'ioredis';

const redisOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
};

const redisClient = new Redis(redisOptions);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err: Error) => {
    console.error('Redis connection error:', err);
});

export default redisClient;
