import { ZoneEnum } from '../../../../Enums/Zone';
import { ServerMessage } from '../../MessageBase';
/**
 * This message is for cards the player requested to be moved (currently, always between rows,
 * as cards that were played have their own message)
 */
export default class ServerCardMovedRowMessage extends ServerMessage {
    ownerPlayerUserId: string;
    movedCardInstanceId: number;
    originZoneEnum: ZoneEnum;
    destinationZoneEnum: ZoneEnum;
    queuePosition: number;
    constructor(recipientUserId: string, ownerPlayerUserId: string, movedCardInstanceId: number, originZoneEnum: ZoneEnum, destinationZoneEnum: ZoneEnum, queuePosition: number);
    toJSON(): any;
    static fromJSON(json: any): ServerCardMovedRowMessage;
    validate(): boolean;
}
