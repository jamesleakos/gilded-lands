import BaseAbility from './BaseAbility';
import EffectUpgrade from '../Effect/EffectUpgrade';
import { PhaseEnum } from '../../Enums/Phase';
declare class BaseAbilityUpgrade {
    abilityUpgradeIndex: number;
    effectUpgrade: EffectUpgrade;
    addUseablePhases: PhaseEnum[];
    removeUseablePhases: PhaseEnum[];
    upgradeAbility(ability: BaseAbility): void;
}
export default BaseAbilityUpgrade;
