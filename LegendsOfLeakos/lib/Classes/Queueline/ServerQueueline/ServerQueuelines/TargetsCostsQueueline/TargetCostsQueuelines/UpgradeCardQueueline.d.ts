import TargetsCostsQueueline from '../TargetsCostsQueueline';
import GameServer from '../../../../../Server/GameServer';
import TargetInfo from '../../../../../Target/TargetInfo';
import RuntimeEffect from '../../../../../Effect/RuntimeEffect';
import PayResourceCost from '../../../../../PayResourceCost/PayResourceCost';
declare class UpgradeCardQueueLine extends TargetsCostsQueueline {
    upgradeLevel: number;
    constructor(clientMessageId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, targetInfoList: TargetInfo[], paidCosts: PayResourceCost[], effect: RuntimeEffect, priority: number, upgradeLevel: number);
    sendEffectToDoEffect(server: GameServer, queuePosition: number): void;
}
export default UpgradeCardQueueLine;
