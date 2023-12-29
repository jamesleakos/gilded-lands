import { ConditionType, ConditionValueType } from '../../Enums/Condition';
import GameState from '../Game/GameState';
import ConditionValue from './ConditionValue';
declare abstract class RuntimeCondition {
    conditionType: ConditionType;
    conditionValues: ConditionValue[];
    abstract isTrue(targetEntityInstanceId: number, sourceEntityInstanceId: number, state: GameState): boolean;
    getConditionValue(conditionValueEnum: ConditionValueType): ConditionValue | undefined;
    requiredConditionValues(): ConditionValueType[];
    assignConditionValues(conditionType: ConditionType, conditionValues: ConditionValue[]): void;
    abstract getReadableString(gameProperties: any): string;
    private static conditionConstructors;
    static registerCondition(type: ConditionType, ctor: new (conditionType: ConditionType, conditionValues: ConditionValue[]) => RuntimeCondition): void;
    static createCondition(conditionType: ConditionType, conditionValues: ConditionValue[]): RuntimeCondition;
    static createConditionForDeckBuilder(conditionType: ConditionType): RuntimeCondition;
    toJSON(): any;
    static fromJSON(json: any): RuntimeCondition;
    static isJSONValid(json: any): boolean;
}
export default RuntimeCondition;
