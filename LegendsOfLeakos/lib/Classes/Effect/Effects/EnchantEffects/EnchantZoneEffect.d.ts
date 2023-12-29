import GiveEnchantmentBaseEffect from './GiveEnchantmentBaseEffect';
import EffectValue from '../../EffectValue';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import TargetCriteria from '../../../Target/TargetCriteria';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../../../Game/GameManager';
declare class EnchantZoneEffect extends GiveEnchantmentBaseEffect {
    constructor(effectValues: EffectValue[], setTargetTypes: TargetCriteria[]);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    static sampleEffectForCardBuilder(): EnchantZoneEffect;
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(gameManager: GameManager): string;
}
export default EnchantZoneEffect;
