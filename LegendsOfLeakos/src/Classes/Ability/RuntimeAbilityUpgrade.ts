import EffectUpgrade from '../Effect/EffectUpgrade';
import { PhaseEnum } from '../../Enums/Phase';
import RuntimeAbility from './RuntimeAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import PayResourceCostUpgrade from '../PayResourceCost/PayResourceCostUpgrade';
import ModifiableInt from '../ModifableInt/ModifiableInt';

class ActivatedAbilityUpgrade {
  abilityUpgradeIndex: number;
  effectUpgrade: EffectUpgrade;
  addUseablePhases: PhaseEnum[];
  removeUseablePhases: PhaseEnum[];
  costUpgrades: PayResourceCostUpgrade[];
  usesPerTurnChange: ModifiableInt;
  isActive: boolean;

  constructor(
    abilityIndex: number,
    effectUpgrade: EffectUpgrade,
    addUseablePhases: PhaseEnum[],
    removeUseablePhases: PhaseEnum[],
    costUpgrades: PayResourceCostUpgrade[],
    usesPerTurnChange: ModifiableInt,
    isActive: boolean
  ) {
    this.abilityUpgradeIndex = abilityIndex;
    this.effectUpgrade = null;
    this.usesPerTurnChange = new ModifiableInt(
      usesPerTurnChange.baseValue,
      usesPerTurnChange.intModifiers
    );
    this.abilityUpgradeIndex = abilityIndex;
    this.isActive = isActive;

    this.addUseablePhases = [...addUseablePhases];
    this.removeUseablePhases = [...removeUseablePhases];
    this.costUpgrades = costUpgrades.map(
      (upgrade) =>
        new PayResourceCostUpgrade(upgrade.statId, upgrade.valueChange)
    );
  }

  public upgradeAbility(ability: RuntimeAbility): void {
    this.effectUpgrade.upgradeEffect(ability.effect);
    for (const phaseEnum of this.addUseablePhases) {
      if (!ability.useableInPhases.includes(phaseEnum)) {
        ability.useableInPhases.push(phaseEnum);
      }
    }
    for (const phaseEnum of this.removeUseablePhases) {
      ability.useableInPhases = ability.useableInPhases.filter(
        (c) => c !== phaseEnum
      );
    }
    if (!(ability instanceof RuntimeAbility)) return;

    (ability as RuntimeAbility).usesPerTurn +=
      this.usesPerTurnChange.effectiveValue;

    for (const costUpgrade of this.costUpgrades) {
      const cost = (ability as RuntimeAbility).costs.find(
        (c) => c.statId === costUpgrade.statId
      );
      if (cost) {
        cost.value += costUpgrade.valueChange.effectiveValue;
      } else {
        (ability as RuntimeAbility).costs.push(
          new PayResourceCost(
            costUpgrade.statId,
            costUpgrade.valueChange.effectiveValue
          )
        );
      }
    }
    (ability as RuntimeAbility).isActive = this.isActive;
  }

  toJSON(): any {
    return {
      abilityUpgradeIndex: this.abilityUpgradeIndex,
      effectUpgrade: this.effectUpgrade.toJSON(),
      addUseablePhases: this.addUseablePhases.map((phase) => PhaseEnum[phase]),
      removeUseablePhases: this.removeUseablePhases.map(
        (phase) => PhaseEnum[phase]
      ),
      costUpgrades: this.costUpgrades.map((c) => c.toJSON()),
      usesPerTurnChange: this.usesPerTurnChange.toJSON(),
      isActive: this.isActive,
    };
  }

  static fromJSON(json: any): ActivatedAbilityUpgrade {
    return new ActivatedAbilityUpgrade(
      json.abilityUpgradeIndex,
      EffectUpgrade.fromJSON(json.effectUpgrade),
      json.addUseablePhases.map(
        (phase: string) => PhaseEnum[phase as keyof typeof PhaseEnum]
      ),
      json.removeUseablePhases.map(
        (phase: string) => PhaseEnum[phase as keyof typeof PhaseEnum]
      ),
      json.costUpgrades.map((c: any) => PayResourceCostUpgrade.fromJSON(c)),
      ModifiableInt.fromJSON(json.usesPerTurnChange),
      json.isActive
    );
  }
}

export default ActivatedAbilityUpgrade;
