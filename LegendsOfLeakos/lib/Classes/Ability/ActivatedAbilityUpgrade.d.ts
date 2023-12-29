import BaseAbilityUpgrade from './BaseAbilityUpgrade';
import EffectUpgrade from '../Effect/EffectUpgrade';
import { PhaseEnum } from '../../Enums/Phase';
import PayResourceCostUpgrade from '../PayResourceCost/PayResourceCostUpgrade';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import BaseAbility from './BaseAbility';
declare class ActivatedAbilityUpgrade extends BaseAbilityUpgrade {
    costUpgrades: PayResourceCostUpgrade[];
    usesPerTurnChange: ModifiableInt;
    isActive: boolean;
    constructor(abilityIndex: number, effectUpgrade: EffectUpgrade, addUseablePhases: PhaseEnum[], removeUseablePhases: PhaseEnum[], costUpgrades: PayResourceCostUpgrade[], usesPerTurnChange: ModifiableInt, isActive: boolean);
    upgradeAbility(ability: BaseAbility): void;
    toJSON(): any;
    static fromJSON(json: any): ActivatedAbilityUpgrade;
}
export default ActivatedAbilityUpgrade;
