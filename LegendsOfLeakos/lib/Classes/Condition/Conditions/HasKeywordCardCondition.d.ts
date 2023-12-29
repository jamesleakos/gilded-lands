import RuntimeCondition from '../RuntimeCondition';
import ConditionValue from '../ConditionValue';
import { ConditionType, ConditionValueType } from '../../../Enums/Condition';
import GameState from '../../Game/GameState';
declare class HasKeywordCardCondition extends RuntimeCondition {
    constructor(conditionType: ConditionType, conditionValues: ConditionValue[]);
    requiredConditionValues(): ConditionValueType[];
    getReadableString(): string;
    isTrue(entityInstanceId: number, sourceIntanceId: number, state: GameState): boolean;
}
export default HasKeywordCardCondition;
