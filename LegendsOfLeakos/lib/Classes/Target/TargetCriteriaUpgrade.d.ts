import RuntimeCondition from '../Condition/RuntimeCondition';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import { ConditionType } from '../../Enums/Condition';
import { TargetTypeEnum, TargetableTypeSelectionEnum } from '../../Enums/Target';
declare class TargetCriteriaUpgrade {
    targetTypeIndex: number;
    newTargetTypeEnum: TargetTypeEnum;
    newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum;
    minSelectionsRequiredChange: ModifiableInt;
    maxSelectionsAllowedChange: ModifiableInt;
    minSelectionsThatMustRemainChange: ModifiableInt;
    newConditions: RuntimeCondition[];
    removeConditionsOfType: ConditionType[];
    constructor(targetTypeIndex: number, newTargetTypeEnum: TargetTypeEnum, newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum, minSelectionsRequiredChange: ModifiableInt, maxSelectionsAllowedChange: ModifiableInt, minSelectionsThatMustRemainChange: ModifiableInt, newConditions: RuntimeCondition[], removeConditionsOfType: ConditionType[]);
    toJSON(): any;
    static fromJSON(json: any): TargetCriteriaUpgrade;
}
export default TargetCriteriaUpgrade;
