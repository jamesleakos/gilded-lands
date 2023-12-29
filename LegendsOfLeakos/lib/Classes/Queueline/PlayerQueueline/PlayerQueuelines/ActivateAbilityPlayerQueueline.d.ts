import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
declare class ActivateAbilityPlayerQueueline extends PlayerQueueline {
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    abilityIndex: number;
    constructor(myPlayerUserId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, queuePosition: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[], abilityIndex: number);
    sendEffectToPlayer(gameState: GameState, myPlayer: Player): void;
    actionToString(gameState: GameState): string;
    clone(): PlayerQueueline;
}
export default ActivateAbilityPlayerQueueline;
