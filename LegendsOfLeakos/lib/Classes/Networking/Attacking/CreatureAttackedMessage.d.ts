import { ServerMessage } from '../MessageBase';
export default class CreatureAttackedMessage extends ServerMessage {
    attackingPlayerUserId: string;
    attackingCardInstanceId: number;
    attackedCardInstanceId: number;
    queuePosition: number;
    constructor(recipientUserId: string, attackingPlayerUserId: string, attackingCardInstanceId: number, attackedCardInstanceId: number, queuePosition: number);
    toJSON(): any;
    static fromJSON(json: any): CreatureAttackedMessage;
    validate(): boolean;
}
