import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
declare class UpgradeCardPlayerQueueLine extends PlayerQueueline {
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    upgradeLevel: number;
    useEffect: boolean;
    constructor(myPlayerUserId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, queuePosition: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[], upgradeLevel: number, useEffect: boolean);
    sendEffectToPlayer(gameState: GameState, myPlayer: Player): void;
    actionToString(gameState: GameState): string;
    clone(): PlayerQueueline;
}
export default UpgradeCardPlayerQueueLine;
