import RuntimeEffect from '../../RuntimeEffect';
import EffectValue from '../../EffectValue';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import TargetCriteria from '../../../Target/TargetCriteria';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../../../Game/GameManager';
declare class EnchantEffect extends RuntimeEffect {
    constructor(effectValues: EffectValue[], setTargetTypes: TargetCriteria[]);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    static sampleEffectForCardBuilder(): EnchantEffect;
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(gameManager: GameManager): string;
}
export default EnchantEffect;
