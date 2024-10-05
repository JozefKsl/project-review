import amqplib, { Connection, Channel } from 'amqplib';
import { Broker } from './broker';

export class BrokerImpl implements Broker {
    constructor(
        private connection: Connection,
        private channel: Channel,
        private queue: string
    ) {}

    static async create(rabbitmqUrl: string, queueName: string) {
        const connection = await amqplib.connect(rabbitmqUrl);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        return new BrokerImpl(connection, channel, queueName);
    }

    async sendToQueue(message: string) {
        this.channel.sendToQueue(this.queue, Buffer.from(message), {
            persistent: true,
        });
    }

    async consumeFromQueue(handler: (msg: any) => void) {
        if (!this.channel) {
            throw new Error('Channel is not initialized');
        }

        this.channel.consume(this.queue, (msg) => {
            if (msg) {
                handler(msg);
                this.channel!.ack(msg); // Acknowledge the message
            }
        });
    }

    async close() {
        await this.channel?.close();
        await this.connection?.close();
    }
}
