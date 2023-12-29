import { ServerMessage } from '../../MessageBase';
import RuntimeCard from '../../../Card/RuntimeCard';
export default class PlayerDrewCardsMessage extends ServerMessage {
    cards: RuntimeCard[];
    constructor(recipientUserId: string, cards: RuntimeCard[]);
    toJSON(): any;
    static fromJSON(json: any): PlayerDrewCardsMessage;
    validate(): boolean;
}
