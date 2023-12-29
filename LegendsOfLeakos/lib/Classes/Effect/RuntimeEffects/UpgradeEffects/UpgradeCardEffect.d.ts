import RuntimeEffect from '../../RuntimeEffect';
import TargetInfo from '../../../Target/TargetInfo';
import TargetCriteria from '../../../Target/TargetCriteria';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
declare class UpgradeCardEffect extends RuntimeEffect {
    upgradeIndex: number;
    targetCriterias(): TargetCriteria[];
    constructor(upgradeIndex: number);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity): boolean;
    isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[]): boolean;
    isTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo, targetCriteria: TargetCriteria): boolean;
    effectToString(): string;
    static createUpgradeCardEffect(upgradeLevel: number): RuntimeEffect;
    toJSON(): any;
    clone(): RuntimeEffect;
}
export default UpgradeCardEffect;
