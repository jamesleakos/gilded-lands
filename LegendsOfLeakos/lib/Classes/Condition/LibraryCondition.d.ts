import { ConditionType } from '../../Enums/Condition';
declare class LibraryCondition {
    conditionType: ConditionType;
    data: any;
    constructor(conditionType: ConditionType, data: any);
    toJSON(): any;
    static fromJSON(json: any): LibraryCondition;
}
export default LibraryCondition;
