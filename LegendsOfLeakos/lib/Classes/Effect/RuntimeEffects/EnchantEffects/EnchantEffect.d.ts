import RuntimeEffect from '../../RuntimeEffect';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import TargetCriteria from '../../../Target/TargetCriteria';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../../../Game/GameManager';
declare class EnchantEffect extends RuntimeEffect {
    enchantmentLibraryID: number;
    enchantTargets: TargetCriteria;
    targetCriterias(): TargetCriteria[];
    constructor(enchantmentLibraryID: number, enchantTargets: TargetCriteria);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity): boolean;
    isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[]): boolean;
    effectToString(gameManager: GameManager): string;
    toJSON(): any;
    clone(): RuntimeEffect;
    static fromRuntimeJSON(json: any): RuntimeEffect;
    static fromLibraryJSON(json: any): RuntimeEffect;
    static createSampleLibraryJSON(): any;
}
export default EnchantEffect;
