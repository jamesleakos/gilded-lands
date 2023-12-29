import { ServerMessage } from '../../MessageBase';
import { ZoneEnum } from '../../../../Enums/Zone';
export default class MoveCardsMessage extends ServerMessage {
    recipientUserId: string;
    originZoneZoneEnum: ZoneEnum;
    destinationZoneZoneEnum: ZoneEnum;
    numCards: number;
    constructor(recipientUserId: string, originZoneZoneEnum: ZoneEnum, destinationZoneZoneEnum: ZoneEnum, numCards: number);
    toJSON(): any;
    static fromJSON(json: any): MoveCardsMessage;
    validate(): boolean;
}
