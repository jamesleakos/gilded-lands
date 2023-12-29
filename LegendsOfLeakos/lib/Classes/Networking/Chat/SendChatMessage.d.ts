import { ClientMessage } from '../MessageBase';
export default class SendChatTextMessage extends ClientMessage {
    recipientUserId: string;
    text: string;
    constructor(messageId: string, senderUserId: string, recipientUserId: string, text: string);
    toJSON(): any;
    static fromJSON(json: any): SendChatTextMessage;
    validate(): boolean;
}
