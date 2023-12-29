import RuntimeEffect from './RuntimeEffect';
import EffectValueCreatorInfo from './EffectValueCreatorInfo';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
import TargetCriteria from '../Target/TargetCriteria';
declare abstract class EntityEffect extends RuntimeEffect {
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    isTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo, targetCriteria: TargetCriteria): boolean;
    isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo[]): boolean;
    isCardStillInPlay(entity: AbilityKeywordRuntimeEntity, state: GameState): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetCriterias: TargetCriteria[]): boolean;
}
export default EntityEffect;
