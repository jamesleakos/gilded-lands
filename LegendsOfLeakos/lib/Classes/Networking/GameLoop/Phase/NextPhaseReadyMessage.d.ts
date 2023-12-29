import { ServerMessage } from '../../MessageBase';
import PlayerInfo from '../../../Player/PlayerInfo';
export default class NextPhaseReadyMessage extends ServerMessage {
    turn: number;
    player: PlayerInfo;
    opponent: PlayerInfo;
    constructor(recipientUserId: string, turn: number, player: PlayerInfo, opponent: PlayerInfo);
    toJSON(): any;
    static fromJSON(json: any): NextPhaseReadyMessage;
    validate(): boolean;
}
