import { BrokerImpl } from './broker/brokerImpl';

const broker = await BrokerImpl.create(
    process.env.RABBIT_MQ_URL || 'amqp://user:password@localhost:5672',
    process.env.RABBIT_MQ_QUEUE_NAME || 'myQueue'
);
