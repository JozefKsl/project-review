export interface Broker {
    sendToQueue(message: string): Promise<any>;
    consumeFromQueue(handler: (msg: any) => void): Promise<any>;
}
