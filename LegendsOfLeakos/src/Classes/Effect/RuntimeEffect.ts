import { EffectType } from '../../Enums/Effect';
import TargetCriteria from '../Target/TargetCriteria';
import TargetInfo from '../Target/TargetInfo';
import GameState from '../Game/GameState';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../Game/GameManager';

// Base class of an effect. It consists of a type (which is associated with a child class, which holds the logic for execution of the effect),
// a list of EffectValues,
abstract class RuntimeEffect {
  public effectType: EffectType;
  abstract targetCriterias(): TargetCriteria[];

  // #region Effect Execution

  abstract preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): boolean;

  public resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): void {
    // Optional override
  }

  // for checking
  abstract areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity
  ): boolean;

  abstract isAllTargetInfoValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfoList: TargetInfo[]
  ): boolean;

  // #endregion
  // #region Runtime Utils
  abstract effectToString(gameManager: GameManager): string;
  // #endregion

  // #region JSON

  abstract toJSON(): any;

  abstract clone(): RuntimeEffect;

  // #endregion

  // #region Runtime JSON Methods
  public static fromRuntimeJSONMethods: {
    [key in EffectType]?: (json: any) => RuntimeEffect;
  } = {};

  public static registerFromRuntimeJSON(
    type: EffectType,
    method: (json: any) => RuntimeEffect
  ): void {
    this.fromRuntimeJSONMethods[type] = method;
  }

  public static fromRuntimeJSON(json: any): RuntimeEffect {
    const effectType: EffectType =
      EffectType[json.effectType as keyof typeof EffectType];
    const method = this.fromRuntimeJSONMethods[effectType];
    if (!method) {
      throw new Error(
        'Effect type not registered for: ' + EffectType[effectType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region Library JSON Methods
  public static fromLibraryJSONMethods: {
    [key in EffectType]?: (json: any) => RuntimeEffect;
  } = {};

  public static registerFromLibraryJSON(
    type: EffectType,
    method: (json: any) => RuntimeEffect
  ): void {
    this.fromLibraryJSONMethods[type] = method;
  }

  public static fromLibraryJSON(json: any): RuntimeEffect {
    const effectType: EffectType =
      EffectType[json.effectType as keyof typeof EffectType];
    const method = this.fromLibraryJSONMethods[effectType];
    if (!method) {
      throw new Error(
        'Effect type not registered for: ' + EffectType[effectType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region isLibraryJSONValid methods

  public static isLibraryJSONValidMethods: {
    [key in EffectType]?: (json: any) => boolean;
  } = {};

  public static registerIsLibraryJSONValid(
    type: EffectType,
    method: (json: any) => boolean
  ): void {
    this.isLibraryJSONValidMethods[type] = method;
  }

  public static isLibraryJSONValid(json: any): boolean {
    const effectType: EffectType =
      EffectType[json.effectType as keyof typeof EffectType];
    const method = this.isLibraryJSONValidMethods[effectType];
    if (!method) {
      throw new Error(
        'Effect type not registered for: ' + EffectType[effectType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region Register Sample Effect Creators

  public static sampleLibraryJSONMethods: {
    [key in EffectType]?: () => any;
  } = {};

  public static registerSampleLibraryJSON(
    type: EffectType,
    creator: () => any
  ): void {
    this.sampleLibraryJSONMethods[type] = creator;
  }

  public static createSampleLibraryJSON(type: EffectType): any {
    const creator = this.sampleLibraryJSONMethods[type];

    if (!creator) {
      throw new Error('No sample effect creator for: ' + EffectType[type]);
    }

    return creator();
  }

  // #endregion
}

export default RuntimeEffect;
