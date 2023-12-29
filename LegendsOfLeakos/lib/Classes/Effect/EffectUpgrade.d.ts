import { EffectType } from '../../Enums/Effect';
import RuntimeEffect from './RuntimeEffect';
import TargetCriteriaUpgrade from '../Target/TargetCriteriaUpgrade';
declare class EffectUpgrade {
    effectEnum: EffectType;
    targetTypeUpgrades: TargetCriteriaUpgrade[];
    constructor(effectType: EffectType, targetTypeUpgrades: TargetCriteriaUpgrade[]);
    upgradeEffect(effect: RuntimeEffect): void;
    toJSON(): any;
    static fromJSON(json: any): EffectUpgrade;
}
export default EffectUpgrade;
