import { EffectType } from '../../Enums/Effect';
import TargetCriteria from '../Target/TargetCriteria';
import TargetInfo from '../Target/TargetInfo';
import GameState from '../Game/GameState';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../Game/GameManager';
declare abstract class RuntimeEffect {
    effectType: EffectType;
    abstract targetCriteriaList(): TargetCriteria[];
    abstract preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: Array<TargetInfo>): void;
    abstract areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetCriterias: Array<TargetCriteria>): boolean;
    abstract isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[]): boolean;
    abstract isTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfo: TargetInfo, targetCriteria: TargetCriteria): boolean;
    abstract effectToString(gameManager: GameManager): string;
    abstract toJSON(): any;
    abstract clone(): RuntimeEffect;
    static fromJSONMethods: {
        [key in EffectType]?: (json: any) => RuntimeEffect;
    };
    static registerFromJSON(type: EffectType, method: (json: any) => RuntimeEffect): void;
    static fromJSON(json: any): RuntimeEffect;
    static isJSONValidMethods: {
        [key in EffectType]?: (json: any) => boolean;
    };
    static registerIsJSONValid(type: EffectType, method: (json: any) => boolean): void;
    static isJSONValid(json: any): boolean;
    static sampleEffectCreators: {
        [key in EffectType]?: () => RuntimeEffect;
    };
    static registerSampleEffectCreator(type: EffectType, creator: () => RuntimeEffect): void;
    static createSampleEffect(type: EffectType): RuntimeEffect;
}
export default RuntimeEffect;
