import RuntimeCondition from '../Condition/RuntimeCondition';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import { ConditionType } from '../../Enums/Condition';
import {
  TargetTypeEnum,
  TargetableTypeSelectionEnum,
} from '../../Enums/Target';

class TargetCriteriaUpgrade {
  public targetTypeIndex: number;
  public newTargetTypeEnum: TargetTypeEnum;
  public newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum;
  public minSelectionsRequiredChange: ModifiableInt;
  public maxSelectionsAllowedChange: ModifiableInt;
  public minSelectionsThatMustRemainChange: ModifiableInt;
  public newConditions: RuntimeCondition[];
  public removeConditionsOfType: ConditionType[];

  constructor(
    targetTypeIndex: number,
    newTargetTypeEnum: TargetTypeEnum,
    newTargetableTypeSelectionEnum: TargetableTypeSelectionEnum,
    minSelectionsRequiredChange: ModifiableInt,
    maxSelectionsAllowedChange: ModifiableInt,
    minSelectionsThatMustRemainChange: ModifiableInt,
    newConditions: RuntimeCondition[],
    removeConditionsOfType: ConditionType[]
  ) {
    this.targetTypeIndex = targetTypeIndex;
    this.newTargetTypeEnum = newTargetTypeEnum;
    this.newTargetableTypeSelectionEnum = newTargetableTypeSelectionEnum;
    this.minSelectionsRequiredChange = new ModifiableInt(
      minSelectionsRequiredChange.baseValue,
      minSelectionsRequiredChange.intModifiers
    );
    this.maxSelectionsAllowedChange = new ModifiableInt(
      maxSelectionsAllowedChange.baseValue,
      maxSelectionsAllowedChange.intModifiers
    );
    this.minSelectionsThatMustRemainChange = new ModifiableInt(
      minSelectionsThatMustRemainChange.baseValue,
      minSelectionsThatMustRemainChange.intModifiers
    );

    this.newConditions = newConditions;

    this.removeConditionsOfType = [...removeConditionsOfType];
  }

  toJSON(): any {
    return {
      targetTypeIndex: this.targetTypeIndex,
      newTargetTypeEnum: TargetTypeEnum[this.newTargetTypeEnum],
      newTargetableTypeSelectionEnum:
        TargetableTypeSelectionEnum[this.newTargetableTypeSelectionEnum],
      minSelectionsRequiredChange: this.minSelectionsRequiredChange.toJSON(),
      maxSelectionsAllowedChange: this.maxSelectionsAllowedChange.toJSON(),
      minSelectionsThatMustRemainChange:
        this.minSelectionsThatMustRemainChange.toJSON(),
      newConditions: this.newConditions.map((c) => c.toJSON()),
      removeConditionsOfType: this.removeConditionsOfType.map(
        (c) => ConditionType[c]
      ),
    };
  }

  static fromJSON(json: any): TargetCriteriaUpgrade {
    return new TargetCriteriaUpgrade(
      json.targetTypeIndex,
      TargetTypeEnum[json.newTargetTypeEnum as keyof typeof TargetTypeEnum],
      TargetableTypeSelectionEnum[
        json.newTargetableTypeSelectionEnum as keyof typeof TargetableTypeSelectionEnum
      ],
      ModifiableInt.fromJSON(json.minSelectionsRequiredChange),
      ModifiableInt.fromJSON(json.maxSelectionsAllowedChange),
      ModifiableInt.fromJSON(json.minSelectionsThatMustRemainChange),
      json.newConditions.map((c: any) => RuntimeCondition.fromLibraryJSON(c)),
      json.removeConditionsOfType.map(
        (c: any) => ConditionType[c as keyof typeof ConditionType]
      )
    );
  }
}

export default TargetCriteriaUpgrade;
