import RuntimeCondition from '../RuntimeCondition';
import ConditionValue from '../ConditionValue';
import { ConditionType, ConditionValueType } from '../../../Enums/Condition';
import GameState from '../../Game/GameState';
declare class CardIsInAcceptableZoneCondition extends RuntimeCondition {
    constructor(conditionType: ConditionType, conditionValues: ConditionValue[]);
    requiredConditionValues(): ConditionValueType[];
    getReadableString(): string;
    isTrue(targetEntityInstanceId: number, sourceEntityInstanceId: number, gameState: GameState): boolean;
}
export default CardIsInAcceptableZoneCondition;
