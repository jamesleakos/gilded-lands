import { ClientMessage } from '../MessageBase';
export default class StopCardBlockingMessage extends ClientMessage {
    blockingCardInstanceId: number;
    constructor(messageId: string, senderUserId: string, blockingCardInstanceId: number);
    toJSON(): any;
    static fromJSON(json: any): StopCardBlockingMessage;
    validate(): boolean;
}
