import { ClientMessage } from '../MessageBase';
export default class PlayerExploredLandMessage extends ClientMessage {
    explored: boolean;
    landTileId: number;
    constructor(messageId: string, senderUserId: string, explored: boolean, landTileId: number);
    toJSON(): any;
    static fromJSON(json: any): PlayerExploredLandMessage;
    validate(): boolean;
}
