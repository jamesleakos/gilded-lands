import { EffectType } from '../../Enums/Effect';
import RuntimeEffect from './RuntimeEffect';
import TargetCriteriaUpgrade from '../Target/TargetCriteriaUpgrade';
import { TargetableTypeSelectionEnum } from '../../Enums/Target';
import RuntimeCondition from '../Condition/RuntimeCondition';

class EffectUpgrade {
  public effectEnum: EffectType;
  public targetTypeUpgrades: TargetCriteriaUpgrade[];

  constructor(
    effectType: EffectType,
    targetTypeUpgrades: TargetCriteriaUpgrade[]
  ) {
    this.effectEnum = effectType;

    this.targetTypeUpgrades = targetTypeUpgrades.map(
      (upgrade) =>
        new TargetCriteriaUpgrade(
          upgrade.targetTypeIndex,
          upgrade.newTargetTypeEnum,
          upgrade.newTargetableTypeSelectionEnum,
          upgrade.minSelectionsRequiredChange,
          upgrade.maxSelectionsAllowedChange,
          upgrade.minSelectionsThatMustRemainChange,
          upgrade.newConditions,
          upgrade.removeConditionsOfType
        )
    );
  }

  public upgradeEffect(effect: RuntimeEffect): void {
    if (effect.effectType !== this.effectEnum) return;
    for (const ttu of this.targetTypeUpgrades) {
      const tt = effect.targetCriterias()[ttu.targetTypeIndex];
      tt.targetTypeEnum = ttu.newTargetTypeEnum;
      tt.targetableTypeSelectionEnum = ttu.newTargetableTypeSelectionEnum;
      tt.playerSelectsTarget =
        ttu.newTargetableTypeSelectionEnum !==
        TargetableTypeSelectionEnum.AutoTarget;
      tt.minSelectionsRequired +=
        ttu.minSelectionsRequiredChange.effectiveValue;
      tt.maxSelectionsAllowed += ttu.maxSelectionsAllowedChange.effectiveValue;
      tt.minSelectionsThatMustRemain +=
        ttu.minSelectionsThatMustRemainChange.effectiveValue;
    }
  }

  toJSON(): any {
    return {
      effectEnum: EffectType[this.effectEnum],
      targetTypeUpgrades: this.targetTypeUpgrades.map((ttu) => ttu.toJSON()),
    };
  }

  static fromJSON(json: any): EffectUpgrade {
    return new EffectUpgrade(
      EffectType[json.effectEnum as keyof typeof EffectType],
      json.targetTypeUpgrades.map((ttu: any) =>
        TargetCriteriaUpgrade.fromJSON(ttu)
      )
    );
  }
}

export default EffectUpgrade;
