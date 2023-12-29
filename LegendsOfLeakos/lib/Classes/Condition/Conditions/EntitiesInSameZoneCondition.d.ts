import EntityReliantOnEntityCondition from '../EntityReliantOnEntityCondition';
import ConditionValue from '../ConditionValue';
import AbilityKeywordRuntimeEntity from '../../Entity/AbilityKeywordRuntimeEntity';
import { ConditionType, ConditionValueType } from '../../../Enums/Condition';
declare class EntitiesInSameZoneCondition extends EntityReliantOnEntityCondition {
    constructor(conditionType: ConditionType, conditionValues: ConditionValue[]);
    requiredConditionValues(): ConditionValueType[];
    getReadableString(): string;
    isTrue(targetEntity: AbilityKeywordRuntimeEntity, reliantEntity: AbilityKeywordRuntimeEntity): boolean;
}
export default EntitiesInSameZoneCondition;
