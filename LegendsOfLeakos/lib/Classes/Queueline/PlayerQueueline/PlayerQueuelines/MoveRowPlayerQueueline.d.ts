import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import { ZoneEnum } from '../../../../Enums/Zone';
import GameState from '../../../Game/GameState';
declare class MoveRowPlayerQueueline extends PlayerQueueline {
    originZoneZoneEnum: ZoneEnum;
    destinationZoneZoneEnum: ZoneEnum;
    constructor(myPlayerUserId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, queuePosition: number, originZoneZoneEnum: ZoneEnum, destinationZoneZoneEnum: ZoneEnum);
    sendEffectToPlayer(gameState: GameState, myPlayer: Player): void;
    actionToString(gameState: GameState): string;
    clone(): PlayerQueueline;
}
export default MoveRowPlayerQueueline;
