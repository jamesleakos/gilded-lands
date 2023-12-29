import { ConditionValueType } from '../../Enums/Condition';
declare class ConditionValue {
    conditionValueType: ConditionValueType;
    values: Array<number>;
    constructor(conditionValueType: ConditionValueType, values: Array<number>);
    returnReadableStringOfValues(): string;
    getValueString(index: number): string;
    toJSON(): any;
    static fromJSON(json: any): ConditionValue;
    static isJSONValid(json: any): boolean;
}
export default ConditionValue;
