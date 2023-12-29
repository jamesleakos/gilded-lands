import { KeywordType } from '../../../Enums/Keyword';
import ModifiableInt from '../../ModifableInt/ModifiableInt';
import RuntimeKeyword from '../RuntimeKeyword/RuntimeKeyword';
import { ConditionType } from '../../../Enums/Condition';
import RuntimeCondition from '../../Condition/RuntimeCondition';

class KeywordUpgrade {
  keywordType: KeywordType;
  keywordUpgradeIndex: number;
  isPermanent: boolean;
  durationChange: ModifiableInt;
  isActive: boolean;

  newConditions: RuntimeCondition[] = [];
  removeConditionsOfType: ConditionType[] = [];

  constructor(
    keywordType: KeywordType,
    keywordUpgradeIndex: number,
    isPermanent: boolean,
    durationChange: ModifiableInt,
    isActive: boolean
  ) {
    this.keywordType = keywordType;
    this.keywordUpgradeIndex = keywordUpgradeIndex;
    this.isPermanent = isPermanent;
    this.durationChange = durationChange;
    this.isActive = isActive;
  }

  upgradeKeyword(keyword: RuntimeKeyword): void {
    if (
      keyword.keywordType !== this.keywordType ||
      keyword.indexForUpgrades !== this.keywordUpgradeIndex
    )
      return;
    keyword.isPermanent = this.isPermanent;
    keyword.duration += this.durationChange.effectiveValue;
    this.newConditions.forEach((c) => {
      keyword.conditions.push(c);
    });
    this.removeConditionsOfType.forEach((ct) => {
      this.newConditions = this.newConditions.filter(
        (c) => c.conditionType !== ct
      );
    });
    keyword.isActive = this.isActive;
  }

  toJSON(): any {
    return {
      keywordType: this.keywordType,
      keywordUpgradeIndex: this.keywordUpgradeIndex,
      isPermanent: this.isPermanent,
      durationChange: this.durationChange.toJSON(),
      isActive: this.isActive,
    };
  }

  static fromJSON(json: any): KeywordUpgrade {
    const keywordType = json.keywordType as KeywordType;
    const keywordUpgradeIndex = json.keywordUpgradeIndex as number;
    const isPermanent = json.isPermanent as boolean;
    const durationChange = ModifiableInt.fromJSON(json.durationChange);
    const isActive = json.isActive as boolean;
    return new KeywordUpgrade(
      keywordType,
      keywordUpgradeIndex,
      isPermanent,
      durationChange,
      isActive
    );
  }
}

export default KeywordUpgrade;
