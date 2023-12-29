import Effect from '../../Effect';
import GiveKeywordBaseEffect from './GiveKeywordBaseEffect';
import EffectValue from '../../EffectValue';
import TargetType from '../../../Target/TargetType';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
declare class GiveShieldedKeywordEffect extends GiveKeywordBaseEffect {
    sampleEffectForCardBuilder(): Effect;
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(): string;
    constructor(setEffectValues: Array<EffectValue>, setTargetTypes: Array<TargetType>);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
}
export default GiveShieldedKeywordEffect;
