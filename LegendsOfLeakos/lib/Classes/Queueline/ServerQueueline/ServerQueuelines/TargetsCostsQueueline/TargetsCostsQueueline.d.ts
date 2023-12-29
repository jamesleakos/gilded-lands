import ServerQueueline from '../../ServerQueueline';
import GameServer from '../../../../Server/GameServer';
import TargetInfo from '../../../../Target/TargetInfo';
import RuntimeEffect from '../../../../Effect/RuntimeEffect';
import PayResourceCost from '../../../../PayResourceCost/PayResourceCost';
declare abstract class TargetsCostsQueueline extends ServerQueueline {
    targetInfoList: TargetInfo[];
    effect: RuntimeEffect;
    paidCosts: PayResourceCost[];
    effectIndex: number;
    setTargetInfoList(targetInfoList: TargetInfo[]): void;
    areTargetsStillAvailable(server: GameServer): boolean;
    areAllSelectedTargetInfoItemsValid(server: GameServer): boolean;
    areTargetsStillRequired(server: GameServer): boolean;
    goOutForTargets(server: GameServer, queuePosition: number): void;
    abstract sendEffectToDoEffect(server: GameServer, queuePosition: number): void;
}
export default TargetsCostsQueueline;
