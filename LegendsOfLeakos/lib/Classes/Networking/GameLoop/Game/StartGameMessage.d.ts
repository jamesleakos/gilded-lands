import { ServerMessage } from '../../MessageBase';
import PlayerInfo from '../../../Player/PlayerInfo';
import GameManager from '../../../Game/GameManager';
export default class StartGameMessage extends ServerMessage {
    playerIndex: number;
    turnDuration: number;
    names: string[];
    player: PlayerInfo;
    opponent: PlayerInfo;
    rngSeed: number;
    gameManager: GameManager;
    constructor(recipientUserId: string, playerIndex: number, turnDuration: number, names: string[], player: PlayerInfo, opponent: PlayerInfo, rngSeed: number, gameManager: GameManager);
    toJSON(): any;
    static fromJSON(json: any): StartGameMessage;
    validate(): boolean;
}
