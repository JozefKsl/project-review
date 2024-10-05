import { BrokerImpl } from './broker/brokerImpl';
import { DatabaseImpl } from './database/databaseImpl';
import db from './db';
import { RatingServiceImpl } from './services/ratingServiceImpl';

const main = async () => {
    const broker = await BrokerImpl.create(
        process.env.RABBIT_MQ_URL || 'amqp://user:password@localhost:5672',
        process.env.RABBIT_MQ_QUEUE_NAME || 'myQueue'
    );

    const database = new DatabaseImpl(
        db,
        process.env.STATS_TABLE_NAME || 'stats',
        process.env.REVIEW_TABLE_NAME || 'review'
    );

    const service = new RatingServiceImpl(database)

    broker.consumeFromQueue(async (message) => {
        const parsedMessage = JSON.parse(message.content);


        await service.updateRating(parsedMessage)

        console.log('Received message:', parsedMessage);
    });

    console.log('Listening for review events...');
};

main().catch(console.error);
