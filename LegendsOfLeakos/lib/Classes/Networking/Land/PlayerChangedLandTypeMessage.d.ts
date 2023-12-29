import { ClientMessage } from '../MessageBase';
export default class PlayerChangedLandTypeMessage extends ClientMessage {
    playerUserId: string;
    landTileId: number;
    landType: number;
    constructor(messageId: string, senderUserId: string, landTileId: number, landType: number);
    toJSON(): any;
    static fromJSON(json: any): PlayerChangedLandTypeMessage;
    validate(): boolean;
}
