import { KeywordType } from '../../../Enums/Keyword';
import AbilityKeywordRuntimeEntity from '../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCondition from '../../Condition/RuntimeCondition';
import Stat from '../../Stat/Stat';
import RuntimeCard from '../../Card/RuntimeCard';
import GameState from '../../Game/GameState';
import TargetableRuntimeEntity from '../../Entity/TargetableRuntimeEntity';
import RuntimeEffect from '../../Effect/RuntimeEffect';
import TargetInfo from '../../Target/TargetInfo';
import StatBuff from '../../Stat/StatBuff';

abstract class RuntimeKeyword {
  keywordType: KeywordType;
  myEntityInstanceId: number;
  indexForUpgrades: number;
  description: string;
  isPermanent: boolean;
  duration: number;
  isActive: boolean;
  imageName: string;
  // conditions for stat buffs
  conditions: RuntimeCondition[] = [];

  // #region EFFECTS

  addStatBuff(
    stat: Stat,
    statCard: RuntimeCard,
    gameState: GameState
  ): StatBuff | null {
    return null;
  }

  preResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {}
  postResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {}

  // #endregion

  // #region End Turn

  onEndTurn(gameState: GameState): void {
    if (!this.isPermanent) {
      this.duration = this.duration - 1;
      if (this.duration <= 0) {
        const myEntity = gameState.getEntityFromAnywhere(
          this.myEntityInstanceId
        ) as AbilityKeywordRuntimeEntity;
        if (!myEntity) {
          throw new Error(
            `Could not find entity with id ${this.myEntityInstanceId}`
          );
        }
        myEntity.removeKeyword(this);
      }
    }
  }

  // #endregion

  // #region JSON

  abstract toJSON(): any;

  abstract clone(): RuntimeKeyword;

  // #endregion

  // #region fromRuntimeJSON methods

  public static fromRuntimeJSONMethods: {
    [key in KeywordType]?: (json: any) => RuntimeKeyword;
  } = {};

  public static registerFromRuntimeJSON(
    type: KeywordType,
    method: (json: any) => RuntimeKeyword
  ): void {
    this.fromRuntimeJSONMethods[type] = method;
  }

  public static fromRuntimeJSON(json: any): RuntimeKeyword {
    const keywordType: KeywordType =
      KeywordType[json.keywordType as keyof typeof KeywordType];
    const method = this.fromRuntimeJSONMethods[keywordType];
    if (!method) {
      throw new Error(
        'Keyword type not registered for: ' + KeywordType[keywordType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region fromLibraryJSON methods

  public static fromLibraryJSONMethods: {
    [key in KeywordType]?: (
      myEntityInstanceId: number,
      json: any
    ) => RuntimeKeyword;
  } = {};

  public static registerFromLibraryJSON(
    type: KeywordType,
    method: (myEntityInstanceId: number, json: any) => RuntimeKeyword
  ): void {
    this.fromLibraryJSONMethods[type] = method;
  }

  public static fromLibraryJSON(
    myEntityInstanceId: number,
    json: any
  ): RuntimeKeyword {
    const keywordType: KeywordType =
      KeywordType[json.keywordType as keyof typeof KeywordType];
    const method = this.fromLibraryJSONMethods[keywordType];
    if (!method) {
      throw new Error(
        'Keyword type not registered for: ' + KeywordType[keywordType]
      );
    }
    return method(myEntityInstanceId, json);
  }

  // #endregion

  // #region isLibraryJSONValid methods

  public static isLibraryJSONValidMethods: {
    [key in KeywordType]?: (json: any) => boolean;
  } = {};

  public static registerIsLibraryJSONValid(
    type: KeywordType,
    method: (json: any) => boolean
  ): void {
    this.isLibraryJSONValidMethods[type] = method;
  }

  public static isLibraryJSONValid(json: any): boolean {
    const keywordType: KeywordType =
      KeywordType[json.keywordType as keyof typeof KeywordType];
    const method = this.isLibraryJSONValidMethods[keywordType];
    if (!method) {
      throw new Error(
        'Keyword type not registered for: ' + KeywordType[keywordType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region Register Sample Keyword Creators

  public static sampleLibraryJSONMethods: {
    [key in KeywordType]?: () => any;
  } = {};

  public static registerSampleLibraryJSON(
    type: KeywordType,
    creator: () => any
  ): void {
    this.sampleLibraryJSONMethods[type] = creator;
  }

  public static createSampleLibraryJSON(type: KeywordType): any {
    const method = this.sampleLibraryJSONMethods[type];
    if (!method) {
      throw new Error('Keyword type not registered for: ' + KeywordType[type]);
    }
    return method();
  }
}

export default RuntimeKeyword;
