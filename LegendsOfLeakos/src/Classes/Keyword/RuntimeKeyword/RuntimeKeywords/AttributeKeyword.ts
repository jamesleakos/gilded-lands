import RuntimeKeyword from '../RuntimeKeyword';
import TargetableRuntimeEntity from '../../../Entity/TargetableRuntimeEntity';
import GameState from '../../../Game/GameState';
import RuntimeEffect from '../../../Effect/RuntimeEffect';
import RuntimeCard from '../../../Card/RuntimeCard';
import TargetInfo from '../../../Target/TargetInfo';
import { KeywordType, Attribute } from '../../../../Enums/Keyword';
import RuntimeCondition from '../../../Condition/RuntimeCondition';
import AttackEffect from '../../../Effect/RuntimeEffects/AttackEffects/AttackEffect';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import DealSetDamageEffect from '../../../Effect/RuntimeEffects/CardTargetEffects/DealSetDamageEffect';
import IntModifier from '../../../ModifableInt/IntModifier';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';

class AttributeKeyword extends RuntimeKeyword {
  attribute: Attribute;

  constructor(
    myEntityId: number,
    indexForUpgrades: number,
    setDescription: string,
    setIsPermanent: boolean,
    setDuration: number,
    isActive: boolean,
    imageName: string,
    conditions: RuntimeCondition[],
    attribute: Attribute
  ) {
    super();
    this.myEntityInstanceId = myEntityId;
    this.keywordType = KeywordType.Attribute;
    this.indexForUpgrades = indexForUpgrades;
    this.description = setDescription;
    this.isPermanent = setIsPermanent;
    this.duration = setDuration;
    this.isActive = isActive;
    this.imageName = imageName;
    this.conditions = conditions;
    this.attribute = attribute;
  }

  // #region JSON
  override toJSON(): any {
    return {
      keywordType: KeywordType[this.keywordType],
      myEntityInstanceId: this.myEntityInstanceId,
      indexForUpgrades: this.indexForUpgrades,
      description: this.description,
      isPermanent: this.isPermanent,
      duration: this.duration,
      isActive: this.isActive,
      imageName: this.imageName,
      conditions: this.conditions.map((c) => c.toJSON()),
      attribute: Attribute[this.attribute],
    };
  }

  override clone(): RuntimeKeyword {
    return new AttributeKeyword(
      this.myEntityInstanceId,
      this.indexForUpgrades,
      this.description,
      this.isPermanent,
      this.duration,
      this.isActive,
      this.imageName,
      this.conditions.map((c) => c.clone()),
      this.attribute
    );
  }

  static fromRuntimeJSON(json: any): RuntimeKeyword {
    return new AttributeKeyword(
      json.myEntityInstanceId,
      json.indexForUpgrades,
      json.description,
      json.isPermanent,
      json.duration,
      json.isActive,
      json.imageName,
      json.conditions.map((c: any) => RuntimeCondition.fromRuntimeJSON(c)),
      Attribute[json.attribute as keyof typeof Attribute]
    );
  }

  static fromLibraryJSON(
    myEntityInstanceId: number,
    json: any
  ): RuntimeKeyword {
    return new AttributeKeyword(
      myEntityInstanceId,
      json.indexForUpgrades,
      json.description,
      json.isPermanent,
      json.duration,
      json.isActive,
      json.imageName,
      json.conditions.map((c: any) => RuntimeCondition.fromLibraryJSON(c)),
      Attribute[json.data.attribute.value as keyof typeof Attribute]
    );
  }

  static isLibraryJSONValid(json: any): boolean {
    if (
      json.keywordType &&
      Object.values(KeywordType)
        .filter((value) => typeof value === 'string')
        .includes(json.keywordType) &&
      json.data.attribute &&
      Object.values(Attribute)
        .filter((value) => typeof value === 'string')
        .includes(json.data.attribute.value)
    ) {
      return true;
    }
    return false;
  }

  static createSampleLibraryJSON(): any {
    return {
      keywordType: KeywordType[KeywordType.Attribute],
      indexForUpgrades: 0,
      description: 'Attribute',
      isPermanent: true,
      duration: 0,
      isActive: true,
      imageName: 'Attribute',
      conditions: [],
      data: {
        attribute: {
          type: 'Enum',
          enum: 'Attribute',
          value: Attribute[Attribute.Impetus],
        },
      },
    };
  }

  // #endregion
}

export default AttributeKeyword;

RuntimeKeyword.registerFromLibraryJSON(
  KeywordType.Attribute,
  AttributeKeyword.fromLibraryJSON
);

RuntimeKeyword.registerFromRuntimeJSON(
  KeywordType.Attribute,
  AttributeKeyword.fromRuntimeJSON
);

RuntimeKeyword.registerIsLibraryJSONValid(
  KeywordType.Attribute,
  AttributeKeyword.isLibraryJSONValid
);

RuntimeKeyword.registerSampleLibraryJSON(
  KeywordType.Attribute,
  AttributeKeyword.createSampleLibraryJSON
);
