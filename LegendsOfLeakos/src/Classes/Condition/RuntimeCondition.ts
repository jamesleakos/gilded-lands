import { ConditionType } from '../../Enums/Condition';
import GameState from '../Game/GameState';

abstract class RuntimeCondition {
  public conditionType: ConditionType;

  // #region Runtime Functional Methods
  public abstract isTrue(
    targetEntityInstanceId: number,
    sourceEntityInstanceId: number,
    state: GameState
  ): boolean;
  // #endregion

  // #region Runtime Utility Methods
  public abstract getReadableString(gameProperties: any): string;
  // #endregion

  // #region toJSON
  abstract toJSON(): any;

  abstract clone(): RuntimeCondition;
  // #endregion

  // #region fromRuntimeJSON methods

  public static fromRuntimeJSONMethods: {
    [key in ConditionType]?: (json: any) => RuntimeCondition;
  } = {};

  public static registerFromRuntimeJSON(
    type: ConditionType,
    method: (json: any) => RuntimeCondition
  ): void {
    this.fromRuntimeJSONMethods[type] = method;
  }

  public static fromRuntimeJSON(json: any): RuntimeCondition {
    const conditionType: ConditionType =
      ConditionType[json.conditionType as keyof typeof ConditionType];
    const method = this.fromRuntimeJSONMethods[conditionType];
    if (!method) {
      throw new Error(
        'Condition type not registered for: ' + ConditionType[conditionType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region fromLibraryJSON methods

  public static fromLibraryJSONMethods: {
    [key in ConditionType]?: (json: any) => RuntimeCondition;
  } = {};

  public static registerFromLibraryJSON(
    type: ConditionType,
    method: (json: any) => RuntimeCondition
  ): void {
    this.fromLibraryJSONMethods[type] = method;
  }

  public static fromLibraryJSON(json: any): RuntimeCondition {
    const conditionType: ConditionType =
      ConditionType[json.conditionType as keyof typeof ConditionType];
    const method = this.fromLibraryJSONMethods[conditionType];
    if (!method) {
      throw new Error(
        'Condition type not registered for: ' + ConditionType[conditionType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region isLibraryJSONValid methods

  public static isLibraryJSONValidMethods: {
    [key in ConditionType]?: (json: any) => boolean;
  } = {};

  public static registerIsLibraryJSONValid(
    type: ConditionType,
    method: (json: any) => boolean
  ): void {
    this.isLibraryJSONValidMethods[type] = method;
  }

  public static isLibraryJSONValid(json: any): boolean {
    const conditionType: ConditionType =
      ConditionType[json.conditionType as keyof typeof ConditionType];
    const method = this.isLibraryJSONValidMethods[conditionType];
    if (!method) {
      throw new Error(
        'Condition type not registered for: ' + ConditionType[conditionType]
      );
    }
    return method(json);
  }

  // #endregion

  // #region Register Sample Condition Creators

  public static sampleLibraryJSONMethods: {
    [key in ConditionType]?: () => any;
  } = {};

  public static registerSampleLibraryJSON(
    type: ConditionType,
    creator: () => any
  ): void {
    this.sampleLibraryJSONMethods[type] = creator;
  }

  public static createSampleLibraryJSON(type: ConditionType): any {
    const method = this.sampleLibraryJSONMethods[type];
    if (!method) {
      throw new Error(
        'Condition type not registered for: ' + ConditionType[type]
      );
    }
    return method();
  }

  // #endregion
}

export default RuntimeCondition;
