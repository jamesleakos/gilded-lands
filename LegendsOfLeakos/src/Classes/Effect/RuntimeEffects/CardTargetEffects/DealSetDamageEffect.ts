import RuntimeEffect from '../../RuntimeEffect';
import { EffectType } from '../../../../Enums/Effect';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameState from '../../../Game/GameState';
import TargetCriteria from '../../../Target/TargetCriteria';
import RuntimeCard from '../../../Card/RuntimeCard';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import {
  TargetTypeEnum,
  TargetableTypeSelectionEnum,
} from '../../../../Enums/Target';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';
import Effect from '../..';

class DealSetDamageEffect extends RuntimeEffect {
  damageAmount: ModifiableInt;
  targetsToBeDealtDamage: TargetCriteria;

  // trackers
  damageAmountTracker: ModifiableInt[];
  divineShieldHitTracker: boolean[];

  override targetCriterias(): TargetCriteria[] {
    return [this.targetsToBeDealtDamage];
  }

  // constructor
  constructor(
    damageAmount: ModifiableInt,
    targetsToBeDealtDamage: TargetCriteria
  ) {
    super();
    this.damageAmount = damageAmount;
    this.targetsToBeDealtDamage = targetsToBeDealtDamage;
  }
  // #region Effect Execution

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ): boolean {
    let targetsToBeDealtDamage: TargetInfo = targetInfoList[0];

    this.damageAmountTracker = [];
    this.divineShieldHitTracker = [];
    for (let targetInstanceId of targetsToBeDealtDamage.targetEntityInstanceIds) {
      this.damageAmountTracker.push(this.damageAmount.clone());
      this.divineShieldHitTracker.push(false);
    }

    if (!this.isAllTargetInfoValid(sourceEntity, state, targetInfoList))
      return false;

    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: Array<TargetInfo>
  ) {
    let targetsToBeDealtDamage: TargetInfo = targetInfoList[0];

    for (
      let i = 0;
      i < targetsToBeDealtDamage.targetEntityInstanceIds.length;
      i++
    ) {
      const targetInstanceId =
        targetsToBeDealtDamage.targetEntityInstanceIds[i];
      const targetEntity = state.getEntityFromAnywhere(targetInstanceId);
      if (targetEntity === null) {
        throw new Error('DealSetDamageEffect requires a valid targetEntity');
      }
      if (targetEntity instanceof RuntimeCard === false) {
        throw new Error(
          'DealSetDamageEffect requires a RuntimeCard as the targetEntity'
        );
      }
      const targetCard = targetEntity as RuntimeCard;

      const damageAmount = this.damageAmountTracker[i].effectiveValue;

      if (!this.divineShieldHitTracker[i]) {
        targetCard.health.baseValue -= damageAmount;
      }
    }
  }

  // #endregion

  // #region Targeting

  override areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity
  ): boolean {
    return this.targetsToBeDealtDamage.areTargetsAvailable(
      sourceEntity.instanceId,
      state
    );
  }

  override isAllTargetInfoValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfoList: TargetInfo[]
  ): boolean {
    if (targetInfoList.length !== 1) return false;
    let targetsToBeDealtDamage: TargetInfo = targetInfoList[0];

    if (
      !this.targetsToBeDealtDamage.isTargetInfoValid(
        sourceEntity.instanceId,
        targetsToBeDealtDamage,
        state
      )
    )
      return false;

    return true;
  }

  // #endregion

  // #region Effect To Text

  override effectToString(): string {
    let outText =
      'Deal ' +
      this.damageAmount.effectiveValue +
      ' damage to between' +
      this.targetsToBeDealtDamage.minSelectionsRequired +
      ' and ' +
      this.targetsToBeDealtDamage.maxSelectionsAllowed +
      ' targets.';
    return outText;
  }

  // #endregion

  // #region JSON
  override toJSON(): any {
    return {
      effectType: EffectType[this.effectType],
      damageAmount: this.damageAmount.toJSON(),
      targetsToBeDealtDamage: this.targetsToBeDealtDamage.toJSON(),
    };
  }

  override clone(): RuntimeEffect {
    return new DealSetDamageEffect(
      this.damageAmount.clone(),
      this.targetsToBeDealtDamage.clone()
    );
  }

  static fromRuntimeJSON(json: any): RuntimeEffect {
    return new DealSetDamageEffect(
      ModifiableInt.fromJSON(json.damageAmount),
      TargetCriteria.fromRuntimeJSON(json.targetsToBeDealtDamage)
    );
  }

  static fromLibraryJSON(json: any): RuntimeEffect {
    return new DealSetDamageEffect(
      new ModifiableInt(json.data.damageAmount.value, []),
      TargetCriteria.fromLibraryJSON(json.data.targetsToBeDealtDamage.value)
    );
  }

  static createSampleLibraryJSON(): any {
    const tc = new TargetCriteria(
      'Deal Damage',
      TargetTypeEnum.TargetCreature,
      1,
      2,
      1,
      TargetableTypeSelectionEnum.TargetableOnActivation,
      []
    );

    return {
      effectType: EffectType[EffectType.DealSetDamage],
      data: {
        damageAmount: {
          type: 'Number',
          value: 1,
        },
        targetsToBeDealtDamage: {},
      },
    };
  }

  // #endregion
}

RuntimeEffect.registerFromRuntimeJSON(
  EffectType.DealSetDamage,
  DealSetDamageEffect.fromRuntimeJSON
);
RuntimeEffect.registerFromLibraryJSON(
  EffectType.DealSetDamage,
  DealSetDamageEffect.fromLibraryJSON
);
RuntimeEffect.registerSampleLibraryJSON(
  EffectType.DealSetDamage,
  DealSetDamageEffect.createSampleLibraryJSON
);

export default DealSetDamageEffect;
