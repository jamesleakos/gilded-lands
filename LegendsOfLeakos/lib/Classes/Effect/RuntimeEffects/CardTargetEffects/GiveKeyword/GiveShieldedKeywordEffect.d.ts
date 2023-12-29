import RuntimeEffect from '../../../RuntimeEffect';
import GiveKeywordBaseEffect from './GiveKeywordBaseEffect';
import EffectValue from '../../../EffectValue';
import TargetCriteria from '../../../../Target/TargetCriteria';
import TargetInfo from '../../../../Target/TargetInfo';
import GameState from '../../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../../Entity/AbilityKeywordRuntimeEntity';
import TargetTypeInfo from '../../../../Target/TargetTypeInfo';
declare class GiveShieldedKeywordEffect extends GiveKeywordBaseEffect {
    constructor(effectValues: Array<EffectValue>, setTargetTypes: Array<TargetCriteria>);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
    static sampleEffectForCardBuilder(): RuntimeEffect;
    myRequiredEffectValues(): any[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(): string;
}
export default GiveShieldedKeywordEffect;
