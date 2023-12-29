import Effect from '../../Effect';
import GiveKeywordBaseEffect from './GiveKeywordBaseEffect';
import { EffectType } from '../../../../Enums/Effect';
import EffectValue from '../../EffectValue';
import GameState from '../../../Game/GameState';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import TargetType from '../../../Target/TargetType';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
declare class GiveShieldedKeywordBasedOnOtherUnitsEffect extends GiveKeywordBaseEffect {
    effectEnum: EffectType;
    effectValues: EffectValue[];
    targetTypes: TargetType[];
    constructor(setEffectValues: EffectValue[], setTargetTypes: TargetType[]);
    sampleEffectForCardBuilder(): Effect;
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(): string;
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
}
export default GiveShieldedKeywordBasedOnOtherUnitsEffect;
