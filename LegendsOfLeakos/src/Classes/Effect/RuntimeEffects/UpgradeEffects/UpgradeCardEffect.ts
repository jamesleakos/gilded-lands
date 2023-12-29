import RuntimeEffect from '../../RuntimeEffect';
import { EffectType } from '../../../../Enums/Effect';
import TargetInfo from '../../../Target/TargetInfo';
import TargetCriteria from '../../../Target/TargetCriteria';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../../../Card/RuntimeCard';
import LibraryCard from '../../../Card/LibraryCard';
import CardUpgrade from '../../../Card/CardUpgrade';
import GameManager from '../../../Game/GameManager';

class UpgradeCardEffect extends RuntimeEffect {
  public upgradeIndex: number;
  override targetCriterias(): TargetCriteria[] {
    return [];
  }

  constructor(upgradeIndex: number) {
    super();
    this.effectType = EffectType.UpgradeCardEffect;
    this.upgradeIndex = upgradeIndex;
  }

  // #region Effect Execution
  public preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    return true;
  }

  public resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {
    if (!(sourceEntity instanceof RuntimeCard)) {
      throw new Error('Why is non card entity attacking?');
    }

    const sourceCard: RuntimeCard = sourceEntity as RuntimeCard;
    const libraryCard: LibraryCard = state.gameManager.getCardFromLibraryId(
      sourceCard.libraryId
    );
    const upgrade: CardUpgrade = libraryCard.cardUpgrades.find(
      (x: CardUpgrade) => x.upgradeIndex === this.upgradeIndex
    );

    upgrade.upgradeCard(sourceCard);
  }

  public areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity
  ): boolean {
    return true;
  }

  public isAllTargetInfoValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfoList: TargetInfo[]
  ): boolean {
    return true;
  }

  public isTargetInfoValid(
    sourceEntity: AbilityKeywordRuntimeEntity,
    state: GameState,
    targetInfo: TargetInfo,
    targetCriteria: TargetCriteria
  ): boolean {
    return true;
  }

  // #endregion

  // #region Runtime Utilities

  override effectToString(): string {
    const outText: string = `Upgrade this card to upgrade with index ${this.upgradeIndex}`;
    return outText;
  }

  // #endregion

  // #region JSON and Creation

  static createUpgradeCardEffect(upgradeLevel: number): RuntimeEffect {
    return new UpgradeCardEffect(upgradeLevel);
  }

  override toJSON(): any {
    return {
      effectType: EffectType[this.effectType],
      upgradeIndex: this.upgradeIndex,
    };
  }

  override clone(): RuntimeEffect {
    return new UpgradeCardEffect(this.upgradeIndex);
  }

  // #endregion
}

export default UpgradeCardEffect;
