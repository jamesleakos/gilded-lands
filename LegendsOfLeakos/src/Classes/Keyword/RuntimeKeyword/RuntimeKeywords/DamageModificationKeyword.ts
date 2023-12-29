import RuntimeKeyword from '../RuntimeKeyword';
import TargetableRuntimeEntity from '../../../Entity/TargetableRuntimeEntity';
import GameState from '../../../Game/GameState';
import RuntimeEffect from '../../../Effect/RuntimeEffect';
import RuntimeCard from '../../../Card/RuntimeCard';
import TargetInfo from '../../../Target/TargetInfo';
import { KeywordType } from '../../../../Enums/Keyword';
import RuntimeCondition from '../../../Condition/RuntimeCondition';
import AttackEffect from '../../../Effect/RuntimeEffects/AttackEffects/AttackEffect';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import DealSetDamageEffect from '../../../Effect/RuntimeEffects/CardTargetEffects/DealSetDamageEffect';
import IntModifier from '../../../ModifableInt/IntModifier';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';

class DamageModificationKeyword extends RuntimeKeyword {
  modifyAbilityDamageAmount: ModifiableInt;
  modifyAttackAmount: ModifiableInt;

  constructor(
    myEntityId: number,
    indexForUpgrades: number,
    setDescription: string,
    setIsPermanent: boolean,
    setDuration: number,
    isActive: boolean,
    imageName: string,
    conditions: RuntimeCondition[],
    modifyAbilityDamageAmount: ModifiableInt,
    modifyAttackAmount: ModifiableInt
  ) {
    super();
    this.myEntityInstanceId = myEntityId;
    this.keywordType = KeywordType.DamageModification;
    this.indexForUpgrades = indexForUpgrades;
    this.description = setDescription;
    this.isPermanent = setIsPermanent;
    this.duration = setDuration;
    this.isActive = isActive;
    this.imageName = imageName;
    this.conditions = conditions;
    this.modifyAbilityDamageAmount = modifyAbilityDamageAmount;
    this.modifyAttackAmount = modifyAttackAmount;
  }

  preResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    if (!this.isActive) {
      return;
    }

    const myEntity = gameState.getEntityFromAnywhere(
      this.myEntityInstanceId
    ) as AbilityKeywordRuntimeEntity;
    if (!myEntity) {
      throw new Error('myEntity is null');
    }

    switch (e.constructor) {
      case AttackEffect:
        // get effect
        const attackEffect = e as AttackEffect;
        // attacked card
        const attackedCard = gameState.getCardFromAnywhere(
          targetInfoList[0].targetEntityInstanceIds[0]
        );
        if (!attackedCard) throw new Error('attackedCard is null');
        // attacking card
        const sourceCard = sourceEntity as RuntimeCard;
        if (!sourceCard) throw new Error('attackingCard is null');

        // do the blocking cards
        attackEffect.blockInfo.forEach((b) => {
          const blockingCard = gameState.getCardFromAnywhere(
            b.blockingCardInstanceId
          );
          if (!blockingCard) {
            throw new Error('blockingCard is null');
          }
          let meetsConditions = true;
          for (let condition of this.conditions) {
            if (
              !condition.isTrue(
                blockingCard.instanceId,
                myEntity.instanceId,
                gameState
              )
            ) {
              meetsConditions = false;
            }
          }
          if (meetsConditions) {
            b.damageToBlockingCard.intModifiers.push(
              new IntModifier(this.modifyAttackAmount.effectiveValue, false)
            );
          }
        });

        // now do the same for the attacked card
        let attackedMeetsConditions = true;
        for (let condition of this.conditions) {
          if (
            !condition.isTrue(
              attackedCard.instanceId,
              myEntity.instanceId,
              gameState
            )
          ) {
            attackedMeetsConditions = false;
          }
        }
        if (attackedMeetsConditions) {
          attackEffect.damageToAttackedCard.intModifiers.push(
            new IntModifier(this.modifyAttackAmount.effectiveValue, false)
          );
        }
        // now do the same for the attacking card
        let attackingMeetsConditions = true;
        for (let condition of this.conditions) {
          if (
            !condition.isTrue(
              sourceCard.instanceId,
              myEntity.instanceId,
              gameState
            )
          ) {
            attackingMeetsConditions = false;
          }
        }
        if (attackingMeetsConditions) {
          attackEffect.damageToAttackingCard.intModifiers.push(
            new IntModifier(this.modifyAttackAmount.effectiveValue, false)
          );
        }

        break;
      case DealSetDamageEffect:
        const dealSetDamageEffect = e as DealSetDamageEffect;
        if (targetInfoList.length !== 1) {
          throw new Error('targetInfoList.length !== 1');
        }
        const attackedCards = targetInfoList[0].targetEntityInstanceIds.map(
          (c) => {
            const card = gameState.getCardFromAnywhere(c);
            if (!card) throw new Error('card is null');
            return card;
          }
        );

        attackedCards.forEach((c, index) => {
          let meetsConditions = true;
          for (let condition of this.conditions) {
            if (
              !condition.isTrue(c.instanceId, myEntity.instanceId, gameState)
            ) {
              meetsConditions = false;
            }
          }
          if (meetsConditions) {
            dealSetDamageEffect.damageAmountTracker[index].intModifiers.push(
              new IntModifier(
                this.modifyAbilityDamageAmount.effectiveValue,
                false
              )
            );
          }
        });
      default:
        break;
    }
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
      modifyAbilityDamageAmount: this.modifyAbilityDamageAmount,
      modifyAttackAmount: this.modifyAttackAmount,
    };
  }

  override clone(): RuntimeKeyword {
    return new DamageModificationKeyword(
      this.myEntityInstanceId,
      this.indexForUpgrades,
      this.description,
      this.isPermanent,
      this.duration,
      this.isActive,
      this.imageName,
      this.conditions.map((c) => c.clone()),
      this.modifyAbilityDamageAmount.clone(),
      this.modifyAttackAmount.clone()
    );
  }

  static fromRuntimeJSON(json: any): RuntimeKeyword {
    return new DamageModificationKeyword(
      json.myEntityInstanceId,
      json.indexForUpgrades,
      json.description,
      json.isPermanent,
      json.duration,
      json.isActive,
      json.imageName,
      json.conditions.map((c: any) => RuntimeCondition.fromRuntimeJSON(c)),
      ModifiableInt.fromJSON(json.modifyAbilityDamageAmount),
      ModifiableInt.fromJSON(json.modifyAttackAmount)
    );
  }

  static fromLibraryJSON(
    myEntityInstanceId: number,
    json: any
  ): RuntimeKeyword {
    return new DamageModificationKeyword(
      myEntityInstanceId,
      json.indexForUpgrades,
      json.description,
      json.isPermanent,
      json.duration,
      json.isActive,
      json.imageName,
      json.conditions.map((c: any) => RuntimeCondition.fromLibraryJSON(c)),
      new ModifiableInt(json.data.modifyAbilityDamageAmount.value, []),
      new ModifiableInt(json.data.modifyAttackAmount.value, [])
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
      json.data.modifyAbilityDamageAmount &&
      json.data.modifyAttackAmount
    ) {
      return true;
    }
    return false;
  }

  static createSampleLibraryJSON(): any {
    return {
      keywordType: KeywordType[KeywordType.DamageModification],
      indexForUpgrades: 0,
      description: '',
      isPermanent: false,
      duration: 0,
      isActive: false,
      imageName: '',
      conditions: [],
      data: {
        modifyAbilityDamageAmount: {
          type: 'Number',
          value: 0,
        },
        modifyAttackAmount: {
          type: 'Number',
          value: 0,
        },
      },
    };
  }
}

RuntimeKeyword.registerFromLibraryJSON;

export default DamageModificationKeyword;
