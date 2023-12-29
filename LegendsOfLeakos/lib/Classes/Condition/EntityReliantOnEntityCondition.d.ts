import Condition from './Condition';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
declare abstract class EntityReliantOnEntityCondition extends Condition {
    /**
     * Returns true if this condition has been met on the specified targetEntity and reliantEntity, and false otherwise.
     * @param targetEntity The target entity.
     * @param reliantEntity The reliant entity.
     * @returns True if this condition has been met on the specified targetEntity and reliantEntity; false otherwise.
     */
    abstract isTrue(targetEntity: AbilityKeywordRuntimeEntity, reliantEntity: AbilityKeywordRuntimeEntity): boolean;
}
export default EntityReliantOnEntityCondition;
