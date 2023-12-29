import Effect from '../../Effect';
import EntityEffect from '../../EntityEffect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import EffectValue from '../../EffectValue';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameState from '../../../Game/GameState';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
declare class DealDamageEqualToAttackEffect extends EntityEffect {
    sampleEffectForCardBuilder(): Effect;
    myRequiredEffectValues(): Array<EffectValueCreatorInfo>;
    numberOfTargetTypes(): number;
    targetTypeInfoList(): Array<TargetTypeInfo>;
    effectToString(): string;
    constructor(setEffectValues: Array<EffectValue>, setTargetTypes: Array<TargetType>);
    changeEffectDamageAmount(newAmount: number, index: number, modifyPermanent: boolean): void;
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
}
export default DealDamageEqualToAttackEffect;
