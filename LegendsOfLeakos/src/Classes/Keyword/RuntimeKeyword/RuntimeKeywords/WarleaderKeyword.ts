import RuntimeKeyword from '../RuntimeKeyword';
import Stat from '../../../Stat/Stat';
import StatBuff from '../../../Stat/StatBuff';
import RuntimeCard from '../../../Card/RuntimeCard';
import GameState from '../../../Game/GameState';
import { KeywordType } from '../../../../Enums/Keyword';
import RuntimeCondition from '../../../Condition/RuntimeCondition';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';

class WarleaderKeyword extends RuntimeKeyword {
  buffAttackStatAmount: ModifiableInt;
  buffHealthStatAmount: ModifiableInt;

  constructor(
    myEntityInstanceId: number,
    indexForUpgrades: number,
    setDescription: string,
    setIsPermanent: boolean,
    setDuration: number,
    isActive: boolean,
    conditions: RuntimeCondition[],
    imageName: string,
    buffAttackStatAmount: ModifiableInt,
    buffHealthStatAmount: ModifiableInt
  ) {
    super();
    this.myEntityInstanceId = myEntityInstanceId;
    this.keywordType = KeywordType.Warleader;
    this.indexForUpgrades = indexForUpgrades;
    this.description = setDescription;
    this.isPermanent = setIsPermanent;
    this.duration = setDuration;
    this.isActive = isActive;
    this.imageName = imageName;
    this.conditions = conditions;
    this.buffAttackStatAmount = buffAttackStatAmount;
    this.buffHealthStatAmount = buffHealthStatAmount;
  }

  public addStatBuff(
    stat: Stat,
    statCard: RuntimeCard,
    gameState: GameState
  ): StatBuff | null {
    const myEntity = gameState.getEntityFromAnywhere(
      this.myEntityInstanceId
    ) as AbilityKeywordRuntimeEntity;
    if (!myEntity) {
      throw new Error('myEntity is null');
    }

    for (const condition of this.conditions) {
      if (
        !condition.isTrue(
          statCard.instanceId,
          this.myEntityInstanceId,
          gameState
        )
      )
        return null;
    }

    switch (stat.name) {
      case 'Attack':
        return new StatBuff(
          this.buffAttackStatAmount.effectiveValue,
          myEntity.name +
            ' is granting ' +
            this.buffAttackStatAmount.effectiveValue +
            ' attack.'
        );
      case 'Life':
        return new StatBuff(
          this.buffHealthStatAmount.effectiveValue,
          myEntity.name +
            ' is granting ' +
            this.buffHealthStatAmount.effectiveValue +
            ' health.'
        );
      default:
        return null;
    }
    // shouldn't need this because of the switch but oh well
    return null;
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
      buffAttackStatAmount: this.buffAttackStatAmount,
      buffHealthStatAmount: this.buffHealthStatAmount,
    };
  }

  override clone(): RuntimeKeyword {
    return new WarleaderKeyword(
      this.myEntityInstanceId,
      this.indexForUpgrades,
      this.description,
      this.isPermanent,
      this.duration,
      this.isActive,
      this.conditions.map((c) => c.clone()),
      this.imageName,
      this.buffAttackStatAmount.clone(),
      this.buffHealthStatAmount.clone()
    );
  }

  static fromRuntimeJSON(json: any): RuntimeKeyword {
    return new WarleaderKeyword(
      json.myEntityInstanceId,
      json.indexForUpgrades,
      json.description,
      json.isPermanent,
      json.duration,
      json.isActive,
      json.conditions.map((c: any) => RuntimeCondition.fromRuntimeJSON(c)),
      json.imageName,
      ModifiableInt.fromJSON(json.buffAttackStatAmount),
      ModifiableInt.fromJSON(json.buffHealthStatAmount)
    );
  }

  static fromLibraryJSON(
    myEntityInstanceId: number,
    json: any
  ): RuntimeKeyword {
    return new WarleaderKeyword(
      myEntityInstanceId,
      json.indexForUpgrades,
      json.description,
      json.isPermanent,
      json.duration,
      json.isActive,
      json.conditions.map((c: any) => RuntimeCondition.fromLibraryJSON(c)),
      json.imageName,
      new ModifiableInt(json.data.buffAttackStatAmount.value, []),
      new ModifiableInt(json.data.buffHealthStatAmount.value, [])
    );
  }

  static isLibraryJSONValid(json: any): boolean {
    if (
      json.keywordType &&
      Object.values(KeywordType)
        .filter((value) => typeof value === 'string')
        .includes(json.keywordType) &&
      json.indexForUpgrades &&
      typeof json.indexForUpgrades === 'number' &&
      json.description &&
      typeof json.description === 'string' &&
      json.isPermanent &&
      typeof json.isPermanent === 'boolean' &&
      json.duration &&
      typeof json.duration === 'number' &&
      json.isActive &&
      typeof json.isActive === 'boolean' &&
      json.imageName &&
      typeof json.imageName === 'string' &&
      json.conditions &&
      Array.isArray(json.conditions) &&
      json.conditions.every((c: any) =>
        RuntimeCondition.isLibraryJSONValid(c)
      ) &&
      json.data &&
      json.data.buffAttackStatAmount &&
      typeof json.data.buffAttackStatAmount.value === 'number' &&
      json.data.buffHealthStatAmount &&
      typeof json.data.buffHealthStatAmount.value === 'number'
    ) {
      return true;
    }
    return false;
  }

  static createSampleLibraryJSON(): any {
    return {
      keywordType: KeywordType[KeywordType.Warleader],
      indexForUpgrades: 0,
      description: 'New Description',
      isPermanent: true,
      duration: 0,
      isActive: true,
      imageName: '',
      conditions: [],
      data: {
        buffAttackStatAmount: {
          type: 'Number',
          value: 1,
        },
        buffHealthStatAmount: {
          type: 'Number',
          value: 1,
        },
      },
    };
  }

  // #endregion
}

RuntimeKeyword.registerFromLibraryJSON(
  KeywordType.Warleader,
  WarleaderKeyword.fromLibraryJSON
);

RuntimeKeyword.registerFromRuntimeJSON(
  KeywordType.Warleader,
  WarleaderKeyword.fromRuntimeJSON
);

RuntimeKeyword.registerIsLibraryJSONValid(
  KeywordType.Warleader,
  WarleaderKeyword.isLibraryJSONValid
);

RuntimeKeyword.registerSampleLibraryJSON(
  KeywordType.Warleader,
  WarleaderKeyword.createSampleLibraryJSON
);

export default WarleaderKeyword;
