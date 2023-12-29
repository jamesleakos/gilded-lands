import { ClientMessage } from '../MessageBase';
export default class QueueFightCreatureMessage extends ClientMessage {
    attackingCardInstanceId: number;
    attackedCardInstanceId: number;
    constructor(messageId: string, senderUserId: string, attackingCardInstanceId: number, attackedCardInstanceId: number);
    toJSON(): any;
    static fromJSON(json: any): QueueFightCreatureMessage;
    validate(): boolean;
}
