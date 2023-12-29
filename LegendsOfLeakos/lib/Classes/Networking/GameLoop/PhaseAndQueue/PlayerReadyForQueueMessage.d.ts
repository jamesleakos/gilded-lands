import { ClientMessage } from '../../MessageBase';
export default class PlayerReadyForQueueMessage extends ClientMessage {
    constructor(messageId: string, senderUserId: string);
    toJSON(): any;
    static fromJSON(json: any): PlayerReadyForQueueMessage;
    validate(): boolean;
}
