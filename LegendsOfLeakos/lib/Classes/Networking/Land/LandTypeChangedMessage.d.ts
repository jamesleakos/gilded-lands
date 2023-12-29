import { ServerMessage } from '../MessageBase';
export default class LandTypeChangedMessage extends ServerMessage {
    playerUserId: string;
    landTileId: number;
    landType: number;
    constructor(recipientUserId: string, playerUserId: string, landTileId: number, landType: number);
    toJSON(): any;
    static fromJSON(json: any): LandTypeChangedMessage;
    validate(): boolean;
}
