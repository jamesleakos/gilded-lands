import { ClientMessage } from '../MessageBase';
export default class ReorderBlockingCardMessage extends ClientMessage {
    blockingCardInstanceId: number;
    newBlockingPosition: number;
    constructor(messageId: string, senderUserId: string, blockingCardInstanceId: number, newBlockingPosition: number);
    toJSON(): any;
    static fromJSON(json: any): ReorderBlockingCardMessage;
    validate(): boolean;
}
