import { ClientMessage } from '../../MessageBase';
export default class QueueCardMovedRowMessage extends ClientMessage {
    movedCardInstanceId: number;
    originZoneZoneEnum: number;
    destinationZoneZoneEnum: number;
    constructor(messageId: string, senderUserId: string, movedCardInstanceId: number, originZoneZoneEnum: number, destinationZoneZoneEnum: number);
    toJSON(): any;
    static fromJSON(json: any): QueueCardMovedRowMessage;
    validate(): boolean;
}
