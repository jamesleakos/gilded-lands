import EffectUpgrade from '../Effect/EffectUpgrade';
import { PhaseEnum } from '../../Enums/Phase';
import RuntimeAbility from './RuntimeAbility';
import PayResourceCostUpgrade from '../PayResourceCost/PayResourceCostUpgrade';
import ModifiableInt from '../ModifableInt/ModifiableInt';
declare class ActivatedAbilityUpgrade {
    abilityUpgradeIndex: number;
    effectUpgrade: EffectUpgrade;
    addUseablePhases: PhaseEnum[];
    removeUseablePhases: PhaseEnum[];
    costUpgrades: PayResourceCostUpgrade[];
    usesPerTurnChange: ModifiableInt;
    isActive: boolean;
    constructor(abilityIndex: number, effectUpgrade: EffectUpgrade, addUseablePhases: PhaseEnum[], removeUseablePhases: PhaseEnum[], costUpgrades: PayResourceCostUpgrade[], usesPerTurnChange: ModifiableInt, isActive: boolean);
    upgradeAbility(ability: RuntimeAbility): void;
    toJSON(): any;
    static fromJSON(json: any): ActivatedAbilityUpgrade;
}
export default ActivatedAbilityUpgrade;
