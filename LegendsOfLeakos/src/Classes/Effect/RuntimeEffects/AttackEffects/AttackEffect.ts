import { EffectType } from '../../../../Enums/Effect';
import TargetCriteria from '../../../Target/TargetCriteria';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../../../Card/RuntimeCard';
import { ZoneEnum, ZoneEnumMethods } from '../../../../Enums/Zone';
import RuntimeEffect from '../../RuntimeEffect';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';

class AttackEffect extends RuntimeEffect {
  // this is all purely to trigger preEffects on other entities - it does NOT effect eventual damage
  blockInfo: {
    blockingCardInstanceId: number;
    damageToBlockingCard: ModifiableInt;
    damageToAttackingCard: ModifiableInt;
    damageToBlockingCardPrevented: boolean;
    damageToAttackingCardPrevented: boolean;
  }[] = [];
  damageToAttackedCard: ModifiableInt;
  damageToAttackedCardPrevented: boolean;
  damageToAttackingCard: ModifiableInt;
  damageToAttackingCardPrevented: boolean;

  // target criteria
  override targetCriterias(): TargetCriteria[] {
    return [];
  }

  constructor() {
    super();
    this.effectType = EffectType.NormalAttack;
  }
  // #region Effect Execution
  // NOTE: this is all purely to trigger preEffects on other entities
  // it does NOT effect eventual damage
  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    // check for attacked and attacking
    const attackedCard = state.getCardFromAnywhere(
      targetInfoList[0].targetEntityInstanceIds[0]
    );
    if (!attackedCard) return false;
    const attackedCardZone = state.getZoneByInstanceId(
      attackedCard.residingZoneInstanceId
    );
    if (!ZoneEnumMethods.isBoard(attackedCardZone.zoneEnum)) return false;

    const attackingCard = sourceEntity as RuntimeCard;
    if (!attackingCard) throw new Error('Why is non card entity attacking?');
    const attackingCardZone = state.getZoneByInstanceId(
      attackingCard.residingZoneInstanceId
    );
    if (!ZoneEnumMethods.isBoard(attackingCardZone.zoneEnum)) return false;
    // done checks

    const releventBlocks = state.blocks.filter(
      (block) => block.blockedCardInstanceId === attackedCard.instanceId
    );

    // sort blocks by block order (ascending)
    releventBlocks.sort((a, b) => a.blockOrder - b.blockOrder);

    const blockingCards = releventBlocks.map((block) =>
      state.getCardFromAnywhere(block.blockingCardInstanceId)
    );

    let totalDamageFromAttackingCard = attackingCard.attack.effectiveValue;

    for (let i = 0; i < blockingCards.length; i++) {
      const blockingCard = blockingCards[i];
      const blockingCardZone = state.getZoneByInstanceId(
        blockingCard.residingZoneInstanceId
      );
      let damageToBlockingCard = Math.min(
        totalDamageFromAttackingCard,
        blockingCard.health.effectiveValue
      );
      let damangeToAttackingCard = blockingCard.attack.effectiveValue;

      if (blockingCardZone.zoneEnum !== ZoneEnum.FrontBoard) {
        damageToBlockingCard = 0;
        damangeToAttackingCard = 0;
      }

      totalDamageFromAttackingCard -= damageToBlockingCard;

      const newBlockInfo = {
        blockingCardInstanceId: blockingCard.instanceId,
        damageToBlockingCard: new ModifiableInt(damageToBlockingCard, []),
        damageToAttackingCard: new ModifiableInt(
          totalDamageFromAttackingCard,
          []
        ),
        damageToBlockingCardPrevented: false,
        damageToAttackingCardPrevented: false,
      };

      this.blockInfo.push(newBlockInfo);
    }

    this.damageToAttackedCard = new ModifiableInt(
      Math.min(
        totalDamageFromAttackingCard,
        attackedCard.health.effectiveValue
      ),
      []
    );

    this.damageToAttackedCardPrevented = false;

    this.damageToAttackingCard = new ModifiableInt(
      attackedCard.attack.effectiveValue,
      []
    );

    this.damageToAttackingCardPrevented = false;
    return true;
  }

  // NOTE: resolve is NOT effected by the block list ModifiableInts
  // Those were to trigger preEffects on other entities - dealing damage, boosting health, etc.
  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ) {
    // check for attacked and attacking
    const attackedCard = state.getCardFromAnywhere(
      targetInfoList[0].targetEntityInstanceIds[0]
    );
    if (!attackedCard) return false;
    const attackedCardZone = state.getZoneByInstanceId(
      attackedCard.residingZoneInstanceId
    );
    if (!ZoneEnumMethods.isBoard(attackedCardZone.zoneEnum)) return false;

    const attackingCard = sourceEntity as RuntimeCard;
    if (!attackingCard) throw new Error('Why is non card entity attacking?');
    const attackingCardZone = state.getZoneByInstanceId(
      attackingCard.residingZoneInstanceId
    );
    if (!ZoneEnumMethods.isBoard(attackingCardZone.zoneEnum)) return false;
    // done checks

    let remainingDamageToAttackedCard = attackingCard.attack.effectiveValue;

    // apply damage to blocking cards
    for (let block of this.blockInfo) {
      const blockingCard = state.getCardFromAnywhere(
        block.blockingCardInstanceId
      );
      if (!blockingCard) continue;
      const blockingCardZone = state.getZoneByInstanceId(
        blockingCard.residingZoneInstanceId
      );
      if (!ZoneEnumMethods.isBoard(blockingCardZone.zoneEnum)) continue;

      const damageToBlockingCard = Math.min(
        remainingDamageToAttackedCard,
        blockingCard.health.effectiveValue
      );

      remainingDamageToAttackedCard -= damageToBlockingCard;
      if (!block.damageToBlockingCardPrevented) {
        blockingCard.health.baseValue -= damageToBlockingCard;
      }
      if (!block.damageToAttackingCardPrevented) {
        attackingCard.health.baseValue -= blockingCard.attack.effectiveValue;
      }

      // if this is here: to incentivize attacking, damage stops once the attacker runs out of attack
      // if (remainingDamageToAttackedCard <= 0) return;
    }

    // if this is here: if someone commits a bunch of blockers to one card, they should be rewarded
    // against any attacks on that card
    if (remainingDamageToAttackedCard <= 0) return;

    // apply damage to attacked card
    if (!this.damageToAttackedCardPrevented) {
      attackedCard.health.baseValue -= remainingDamageToAttackedCard;
    }
    if (!this.damageToAttackingCardPrevented) {
      attackingCard.health.baseValue -=
        this.damageToAttackingCard.effectiveValue;
    }
  }

  applyShieldToAttackedCard(shieldAmount: number) {
    console.log(
      'Here we need to add a modifier to the DamageToAttackedCardEffectValue'
    );
  }

  hitDivineShield() {
    console.log('Here we need to implement this');
  }

  // #endregion

  // #region Runtime Target Methods

  override areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity
  ): boolean {
    const sourceCard = sourceEntity as RuntimeCard;
    if (!sourceCard) return false;

    const sourceCardZone = state.getZoneByInstanceId(
      sourceCard.residingZoneInstanceId
    );

    if (!ZoneEnumMethods.isBoard(sourceCardZone.zoneEnum)) return false;

    // we can implement the rest of this if we want, but for now the server takes care of it
    return true;
  }

  override isAllTargetInfoValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfoList: TargetInfo[]
  ): boolean {
    return true;
  }

  // #endregion

  // #region Runtime Utils

  override effectToString(): string {
    const outText =
      "Unit attacks another unit. They both take damage equal to the other's attack.";
    return outText;
  }

  // #endregion

  // #region Static Creator Functions
  static createFightEffect(): AttackEffect {
    const effect = new AttackEffect();
    return effect;
  }

  static createFightTargetInfoList(
    attackedCardInstanceId: number
  ): TargetInfo[] {
    let targetInfoList: TargetInfo[] = [];
    let targetInfo = new TargetInfo([attackedCardInstanceId], false, false);
    targetInfoList.push(targetInfo);
    return targetInfoList;
  }
  // #endregion

  // #region JSON

  override toJSON(): any {
    return {
      effectType: EffectType[this.effectType],
    };
  }

  override clone(): RuntimeEffect {
    return new AttackEffect();
  }

  // #endregion
}

export default AttackEffect;
