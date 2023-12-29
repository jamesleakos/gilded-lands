import TargetsCostsQueueline from '../TargetsCostsQueueline';
import GameServer from '../../../../../Server/GameServer';
import TargetInfo from '../../../../../Target/TargetInfo';
import RuntimeEffect from '../../../../../Effect/RuntimeEffect';
import PayResourceCost from '../../../../../PayResourceCost/PayResourceCost';
declare class ActivateAbilityQueueLine extends TargetsCostsQueueline {
    abilityIndex: number;
    constructor(clientMessageId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, targetInfoList: TargetInfo[], paidCosts: PayResourceCost[], effect: RuntimeEffect, priority: number, abilityIndex: number);
    sendEffectToDoEffect(server: GameServer, queuePosition: number): void;
}
export default ActivateAbilityQueueLine;
