import RuntimeEffect from '../../../RuntimeEffect';
import EntityEffect from '../../../EntityEffect';
import EffectValueCreatorInfo from '../../../EffectValueCreatorInfo';
import EffectValue from '../../../EffectValue';
import TargetInfo from '../../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../../Entity/AbilityKeywordRuntimeEntity';
import GameState from '../../../../Game/GameState';
import TargetCriteria from '../../../../Target/TargetCriteria';
import TargetTypeInfo from '../../../../Target/TargetTypeInfo';
declare class DealSetDamageEffect extends EntityEffect {
    constructor(effectValues: Array<EffectValue>, setTargetTypes: Array<TargetCriteria>);
    changeEffectDamageAmount(newAmount: number, index: number, modifyPermanent: boolean): void;
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
    static sampleEffectForCardBuilder(): RuntimeEffect;
    myRequiredEffectValues(): Array<EffectValueCreatorInfo>;
    numberOfTargetTypes(): number;
    targetTypeInfoList(): Array<TargetTypeInfo>;
    effectToString(): string;
}
export default DealSetDamageEffect;
