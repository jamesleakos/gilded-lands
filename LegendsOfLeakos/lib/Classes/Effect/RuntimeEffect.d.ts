import { EffectType } from '../../Enums/Effect';
import TargetCriteria from '../Target/TargetCriteria';
import TargetInfo from '../Target/TargetInfo';
import GameState from '../Game/GameState';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../Game/GameManager';
declare abstract class RuntimeEffect {
    effectType: EffectType;
    abstract targetCriterias(): TargetCriteria[];
    abstract preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
    abstract areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity): boolean;
    abstract isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[]): boolean;
    abstract effectToString(gameManager: GameManager): string;
    abstract toJSON(): any;
    abstract clone(): RuntimeEffect;
    static fromRuntimeJSONMethods: {
        [key in EffectType]?: (json: any) => RuntimeEffect;
    };
    static registerFromRuntimeJSON(type: EffectType, method: (json: any) => RuntimeEffect): void;
    static fromRuntimeJSON(json: any): RuntimeEffect;
    static fromLibraryJSONMethods: {
        [key in EffectType]?: (json: any) => RuntimeEffect;
    };
    static registerFromLibraryJSON(type: EffectType, method: (json: any) => RuntimeEffect): void;
    static fromLibraryJSON(json: any): RuntimeEffect;
    static isLibraryJSONValidMethods: {
        [key in EffectType]?: (json: any) => boolean;
    };
    static registerIsLibraryJSONValid(type: EffectType, method: (json: any) => boolean): void;
    static isLibraryJSONValid(json: any): boolean;
    static sampleLibraryJSONMethods: {
        [key in EffectType]?: () => any;
    };
    static registerSampleLibraryJSON(type: EffectType, creator: () => any): void;
    static createSampleLibraryJSON(type: EffectType): any;
}
export default RuntimeEffect;
