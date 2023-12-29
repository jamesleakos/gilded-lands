import { ClientMessage } from '../MessageBase';
export default class RejoinedGameMessage extends ClientMessage {
    constructor(messageId: string);
    toJSON(): any;
    static fromJSON(json: any): RejoinedGameMessage;
    validate(): boolean;
}
