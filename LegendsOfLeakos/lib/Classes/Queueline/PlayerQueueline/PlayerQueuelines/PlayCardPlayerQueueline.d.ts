import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import { ZoneEnum } from '../../../../Enums/Zone';
import GameState from '../../../Game/GameState';
declare class PlayCardPlayerQueueLine extends PlayerQueueline {
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    originZoneZoneEnum: ZoneEnum;
    destinationZoneZoneEnum: ZoneEnum;
    constructor(myPlayerUserId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, queuePosition: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[], originZoneZoneEnum: ZoneEnum, destinationZoneZoneEnum: ZoneEnum);
    sendEffectToPlayer(gameState: GameState, myPlayer: Player): void;
    actionToString(gameState: GameState): string;
    clone(): PlayerQueueline;
}
export default PlayCardPlayerQueueLine;
