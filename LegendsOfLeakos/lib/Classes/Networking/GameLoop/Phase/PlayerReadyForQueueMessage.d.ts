import { ClientMessage } from '../../MessageBase';
export default class PlayerReadyForQueueMessage extends ClientMessage {
    constructor(senderUserId: string);
    toJSON(): any;
    static fromJSON(json: any): PlayerReadyForQueueMessage;
    validate(): boolean;
}
