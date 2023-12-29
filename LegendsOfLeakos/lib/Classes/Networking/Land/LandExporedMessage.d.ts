import { ServerMessage } from '../MessageBase';
export default class LandExploredMessage extends ServerMessage {
    playerUserId: string;
    explored: boolean;
    landTileId: number;
    constructor(recipientUserId: string, playerUserId: string, explored: boolean, landTileId: number);
    toJSON(): any;
    static fromJSON(json: any): LandExploredMessage;
    validate(): boolean;
}
