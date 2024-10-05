import { DatabaseImpl } from './database/databaseImpl';
import { CacheImpl } from './cache/cacheImpl';
import { ProductServiceImpl } from './services/productServiceImpl';
import { ReviewServiceImpl } from './services/reviewServiceImpl';
import db from './dbClient';
import cacheClient from './cacheClient';
import { BrokerImpl } from './broker/brokerImpl';
import { ProductService } from './services/productService';
import { ReviewService } from './services/reviewService';

let productService: ProductService;
let reviewService: ReviewService;

export const initServices = async () => {
    const database = new DatabaseImpl(
        db,
        process.env.PRODUCT_TABLE_NAME || 'product',
        process.env.REVIEW_TABLE_NAME || 'review',
        process.env.STATS_TABLE_NAME || 'stats'
    );

    const broker = await BrokerImpl.create(
        process.env.RABBIT_MQ_URL || 'amqp://user:password@localhost:5672',
        process.env.RABBIT_MQ_QUEUE_NAME || 'myQueue'
    );

    const cacheImpl = new CacheImpl(cacheClient);

    productService = new ProductServiceImpl(database);
    reviewService = new ReviewServiceImpl(database, broker, cacheImpl);
};

export { productService, reviewService };
