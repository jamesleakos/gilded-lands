import RuntimeCondition from '../RuntimeCondition';
import RuntimeCard from '../../Card/RuntimeCard';
import { ConditionType } from '../../../Enums/Condition';
import { KeywordType } from '../../../Enums/Keyword';
import GameState from '../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../Entity/AbilityKeywordRuntimeEntity';

class HasKeywordCondition extends RuntimeCondition {
  keywordType: KeywordType;

  constructor(keywordType: KeywordType) {
    super();
    this.conditionType = ConditionType.HasKeywordOfType;
    this.keywordType = keywordType;
  }

  override isTrue(
    entityInstanceId: number,
    sourceIntanceId: number,
    state: GameState
  ): boolean {
    // checks
    let entity = state.getEntityFromAnywhere(entityInstanceId);
    if (entity === null) {
      throw new Error('HasKeywordCardCondition requires a valid entity');
    }
    if (entity instanceof AbilityKeywordRuntimeEntity === false) {
      throw new Error(
        'HasKeywordCardCondition requires a AbilityKeywordRuntimeEntity'
      );
    }
    const keywordEntity = entity as AbilityKeywordRuntimeEntity;
    // checks over

    return keywordEntity.hasKeyword(this.keywordType);
  }

  // #region Runtime Utility Methods

  override getReadableString(gameProperties: any): string {
    return `Has keyword ${this.keywordType}`;
  }

  // #endregion

  // #region JSON

  override toJSON(): any {
    return {
      conditionType: ConditionType[this.conditionType],
      keywordType: KeywordType[this.keywordType],
    };
  }

  override clone(): RuntimeCondition {
    return new HasKeywordCondition(this.keywordType);
  }

  static fromRuntimeJSON(json: any): RuntimeCondition {
    return new HasKeywordCondition(
      KeywordType[json.keywordType as keyof typeof KeywordType]
    );
  }

  static fromLibraryJSON(json: any): RuntimeCondition {
    return new HasKeywordCondition(
      KeywordType[json.data.keywordType.value as keyof typeof KeywordType]
    );
  }

  static isLibraryJSONValid(json: any): boolean {
    if (
      json.conditionType &&
      Object.values(ConditionType)
        .filter((value) => typeof value === 'string')
        .includes(json.conditionType) &&
      json.keywordType &&
      Object.values(KeywordType)
        .filter((value) => typeof value === 'string')
        .includes(json.keywordType)
    ) {
      return true;
    }
    return false;
  }

  // #endregion

  // #region Builder Methods

  static createSampleLibraryJSON(): any {
    return {
      conditionType: ConditionType[ConditionType.HasKeywordOfType],
      data: {
        keywordType: {
          type: 'Enum',
          enum: 'KeywordType',
          value: KeywordType[KeywordType.DamageModification],
        },
      },
    };
  }

  // #endregion
}

RuntimeCondition.registerFromLibraryJSON(
  ConditionType.HasKeywordOfType,
  HasKeywordCondition.fromLibraryJSON
);
RuntimeCondition.registerFromRuntimeJSON(
  ConditionType.HasKeywordOfType,
  HasKeywordCondition.fromRuntimeJSON
);
RuntimeCondition.registerIsLibraryJSONValid(
  ConditionType.HasKeywordOfType,
  HasKeywordCondition.isLibraryJSONValid
);
RuntimeCondition.registerSampleLibraryJSON(
  ConditionType.HasKeywordOfType,
  HasKeywordCondition.createSampleLibraryJSON
);

export default HasKeywordCondition;
