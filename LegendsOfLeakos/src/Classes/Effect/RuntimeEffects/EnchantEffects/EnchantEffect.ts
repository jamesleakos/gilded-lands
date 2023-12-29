import RuntimeAbility from '../../../Ability/RuntimeAbility';
import RuntimeEnchantment from '../../../Enchantment/RuntimeEnchantment';
import RuntimeKeyword from '../../../Keyword/RuntimeKeyword/RuntimeKeyword';
import RuntimeEffect from '../../RuntimeEffect';
import { EffectType } from '../../../../Enums/Effect';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import TargetCriteria from '../../../Target/TargetCriteria';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import GameManager from '../../../Game/GameManager';
import LibraryEnchantment from '../../../Enchantment/LibraryEnchantment';
import RuntimeZone from '../../../Zone/RuntimeZone';
import {
  TargetTypeEnum,
  TargetableTypeSelectionEnum,
} from '../../../../Enums/Target';
import RuntimeCard from '../../../Card/RuntimeCard';

class EnchantEffect extends RuntimeEffect {
  enchantmentLibraryID: number;
  enchantTargets: TargetCriteria;
  override targetCriterias(): TargetCriteria[] {
    return [this.enchantTargets];
  }

  constructor(enchantmentLibraryID: number, enchantTargets: TargetCriteria) {
    super();
    this.effectType = EffectType.Enchant;
    this.enchantmentLibraryID = enchantmentLibraryID;
    this.enchantTargets = enchantTargets;
  }

  // #region Resolve
  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    if (!this.isAllTargetInfoValid(sourceEntity, state, targetInfoList))
      return false;

    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {
    if (!this.isAllTargetInfoValid(sourceEntity, state, targetInfoList)) return;

    const libraryEnchantment: LibraryEnchantment =
      state.gameManager.getEnchantmentFromLibraryId(this.enchantmentLibraryID);

    const creatingPlayer = state.getPlayerInfoByUserId(
      sourceEntity.ownerPlayerUserId
    );

    const enchantTargetInfo: TargetInfo = targetInfoList[0];

    for (let targetInstanceId of enchantTargetInfo.targetEntityInstanceIds) {
      const targetEntity = state.getEntityFromAnywhere(targetInstanceId);
      let targetZone: RuntimeZone = null;
      let targetCard: RuntimeCard = null;

      if (targetEntity instanceof RuntimeZone) {
        targetZone = targetEntity;
      } else if (targetEntity instanceof RuntimeCard) {
        targetCard = targetEntity;
        targetZone = state.getZoneByInstanceId(
          targetCard.residingZoneInstanceId
        );
      }

      const runtimeEnchantment: RuntimeEnchantment = new RuntimeEnchantment(
        libraryEnchantment.name,
        libraryEnchantment.imageName,
        libraryEnchantment.libraryId,
        creatingPlayer.currentEntityInstanceId++,
        sourceEntity.instanceId,
        creatingPlayer.userId,
        libraryEnchantment.keywords.map((keyword) =>
          RuntimeKeyword.fromLibraryJSON(sourceEntity.instanceId, keyword)
        ),
        libraryEnchantment.abilities.map((ability) =>
          RuntimeAbility.fromLibraryJSON(ability)
        ),
        targetZone.instanceId,
        targetCard ? targetCard.instanceId : null
      );

      if (targetEntity instanceof RuntimeZone) {
        (targetEntity as RuntimeZone).enchantments.push(runtimeEnchantment);
      } else if (targetEntity instanceof RuntimeCard) {
        (targetEntity as RuntimeCard).enchantments.push(runtimeEnchantment);
      }
    }
  }

  // #endregion

  // #region Targeting

  override areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity
  ): boolean {
    return this.enchantTargets.areTargetsAvailable(
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
    if (
      !this.enchantTargets.areTargetsAvailable(sourceEntity.instanceId, state)
    )
      return false;
    return this.enchantTargets.isTargetInfoValid(
      sourceEntity.instanceId,
      targetInfoList[0],
      state
    );
  }

  // #endregion

  // #region Effect To Text

  effectToString(gameManager: GameManager): string {
    let outText: string =
      'Enchant zone with ' +
      gameManager.getEnchantmentFromLibraryId(this.enchantmentLibraryID).name +
      ' enchantment';
    return outText;
  }

  // #endregion

  // #region JSON

  override toJSON(): any {
    return {
      effectType: EffectType[this.effectType],
      enchantmentLibraryID: this.enchantmentLibraryID,
      enchantTargets: this.enchantTargets.toJSON(),
    };
  }

  override clone(): RuntimeEffect {
    return new EnchantEffect(
      this.enchantmentLibraryID,
      this.enchantTargets.clone()
    );
  }

  static fromRuntimeJSON(json: any): RuntimeEffect {
    return new EnchantEffect(
      json.enchantmentLibraryID,
      TargetCriteria.fromRuntimeJSON(json.enchantTargets)
    );
  }

  static fromLibraryJSON(json: any): RuntimeEffect {
    return new EnchantEffect(
      json.data.enchantmentLibraryID.value,
      TargetCriteria.fromLibraryJSON(json.data.enchantTargets.value)
    );
  }

  // #endregion

  // #region Sample Effect

  static createSampleLibraryJSON(): any {
    const tc = new TargetCriteria(
      'Enchant Target',
      TargetTypeEnum.TargetRow,
      1, // minSelectionsRequired
      1, // maxSelectionsAllowed
      1, // minSelectionsThatMustRemain
      TargetableTypeSelectionEnum.TargetableOnActivation,
      [] // conditions
    );

    return {
      effectType: EffectType[EffectType.Enchant],
      data: {
        enchantmentLibraryID: {
          type: 'number',
          value: 0,
        },
        enchantTargets: {
          type: 'TargetCriteria',
          value: tc.toJSON(),
        },
      },
    };
  }

  // #endregion
}

RuntimeEffect.registerFromRuntimeJSON(
  EffectType.Enchant,
  EnchantEffect.fromRuntimeJSON
);
RuntimeEffect.registerFromLibraryJSON(
  EffectType.Enchant,
  EnchantEffect.fromLibraryJSON
);
RuntimeEffect.registerSampleLibraryJSON(
  EffectType.Enchant,
  EnchantEffect.createSampleLibraryJSON
);

export default EnchantEffect;
