import { ClientMessage } from '../MessageBase';
export default class CancelActionMessage extends ClientMessage {
    messageIdToCancel: string;
    constructor(messageId: string, senderUserId: string, messageIdToCancel: string);
    toJSON(): any;
    static fromJSON(json: any): CancelActionMessage;
    validate(): boolean;
}
