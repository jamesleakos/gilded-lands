import { ServerMessage } from '../../MessageBase';
export default class EndGameMessage extends ServerMessage {
    winnerPlayerIndex: number;
    constructor(recipientUserId: string, winnerPlayerIndex: number);
    toJSON(): any;
    static fromJSON(json: any): EndGameMessage;
    validate(): boolean;
}
