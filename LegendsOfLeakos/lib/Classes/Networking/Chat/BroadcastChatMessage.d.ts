import { ServerMessage } from '../MessageBase';
export default class BroadcastChatTextMessage extends ServerMessage {
    senderUserId: string;
    text: string;
    constructor(recipientUserId: string, senderUserId: string, text: string);
    toJSON(): any;
    static fromJSON(json: any): BroadcastChatTextMessage;
    validate(): boolean;
}
