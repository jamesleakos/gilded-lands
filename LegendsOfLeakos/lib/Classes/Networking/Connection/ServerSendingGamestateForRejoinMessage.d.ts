import { ServerMessage } from '../MessageBase';
import PlayerInfo from '../../Player/PlayerInfo';
import GameManager from '../../Game/GameManager';
export default class ServerSendingGamestateForRejoin extends ServerMessage {
    turn: number;
    phaseIndex: number;
    rngSeed: number;
    player: PlayerInfo;
    opponent: PlayerInfo;
    gameManager: GameManager;
    constructor(recipientUserId: string, turn: number, phaseIndex: number, rngSeed: number, player: PlayerInfo, opponent: PlayerInfo, gameManger: GameManager);
    toJSON(): any;
    static fromJSON(json: any): ServerSendingGamestateForRejoin;
    validate(): boolean;
}
