import { ServerMessage } from '../../MessageBase';
export default class OpponentDrewCardsMessage extends ServerMessage {
    numCards: number;
    constructor(recipientUserId: string, numCards: number);
    toJSON(): any;
    static fromJSON(json: any): OpponentDrewCardsMessage;
    validate(): boolean;
}
