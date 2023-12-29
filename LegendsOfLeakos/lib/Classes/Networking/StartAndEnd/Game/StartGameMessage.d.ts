import { ServerMessage } from '../../MessageBase';
import PlayerInfo from '../../../Player/PlayerInfo';
export default class StartGameMessage extends ServerMessage {
    playerIndex: number;
    turnDuration: number;
    nicknames: string[];
    player: PlayerInfo;
    opponent: PlayerInfo;
    rngSeed: number;
    constructor(recipientUserId: string, playerIndex: number, turnDuration: number, nicknames: string[], player: PlayerInfo, opponent: PlayerInfo, rngSeed: number);
    toJSON(): any;
    static fromJSON(json: any): StartGameMessage;
    validate(): boolean;
}
