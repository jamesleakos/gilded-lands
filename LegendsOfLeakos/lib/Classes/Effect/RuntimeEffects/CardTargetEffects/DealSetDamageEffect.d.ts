import RuntimeEffect from '../../RuntimeEffect';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameState from '../../../Game/GameState';
import TargetCriteria from '../../../Target/TargetCriteria';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';
declare class DealSetDamageEffect extends RuntimeEffect {
    damageAmount: ModifiableInt;
    targetsToBeDealtDamage: TargetCriteria;
    damageAmountTracker: ModifiableInt[];
    divineShieldHitTracker: boolean[];
    targetCriterias(): TargetCriteria[];
    constructor(damageAmount: ModifiableInt, targetsToBeDealtDamage: TargetCriteria);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity): boolean;
    isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[]): boolean;
    effectToString(): string;
    toJSON(): any;
    clone(): RuntimeEffect;
    static fromRuntimeJSON(json: any): RuntimeEffect;
    static fromLibraryJSON(json: any): RuntimeEffect;
    static createSampleLibraryJSON(): any;
}
export default DealSetDamageEffect;
