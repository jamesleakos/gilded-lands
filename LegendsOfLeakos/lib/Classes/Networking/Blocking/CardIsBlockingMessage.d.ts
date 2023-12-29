import { ClientMessage } from '../MessageBase';
export default class CardIsBlockingMessage extends ClientMessage {
    blockingCardInstanceId: number;
    blockedCardInstanceId: number;
    blockOrder: number;
    constructor(messageId: string, senderUserId: string, blockingCardInstanceId: number, blockedCardInstanceId: number, blockOrder: number);
    toJSON(): any;
    static fromJSON(json: any): CardIsBlockingMessage;
    validate(): boolean;
}
