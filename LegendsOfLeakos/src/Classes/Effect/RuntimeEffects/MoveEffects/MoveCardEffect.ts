import RuntimeEffect from '../../RuntimeEffect';
import { EffectType } from '../../../../Enums/Effect';
import TargetInfo from '../../../Target/TargetInfo';
import TargetCriteria from '../../../Target/TargetCriteria';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../../../Card/RuntimeCard';
import { ZoneEnum } from '../../../../Enums/Zone';

class MoveCardEffect extends RuntimeEffect {
  public originZoneZoneEnum: ZoneEnum;
  public destinationZoneZoneEnum: ZoneEnum;
  override targetCriterias(): TargetCriteria[] {
    return [];
  }

  constructor(originZoneZoneEnum: ZoneEnum, destinationZoneZoneEnum: ZoneEnum) {
    super(); // nothing in super
    this.effectType = EffectType.MoveCardEffect;
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
  }

  // #endregion

  // #region Effect Runtime Execution

  override preEffect(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): boolean {
    const residingZone = state.getZoneByInstanceId(
      sourceEntity.residingZoneInstanceId
    );
    if (!residingZone) {
      throw new Error(
        '\n\nERROR: MoveCardEffect.preEffect - no residing zone. \n\n sourceEntity: ' +
          JSON.stringify(sourceEntity)
      );
    }
    if (residingZone.zoneEnum !== this.originZoneZoneEnum) return false;

    return true;
  }

  override resolve(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity,
    targetInfoList: TargetInfo[]
  ): void {
    // shouldn't be trying to move a non-card
    if (!(sourceEntity instanceof RuntimeCard))
      throw new Error('Why is non card entity attacking?');
    let sourceCard: RuntimeCard = sourceEntity as RuntimeCard;

    let ownerPlayer = state.getPlayerInfoByUserId(sourceCard.ownerPlayerUserId);
    const residingZone = state.getZoneByInstanceId(
      sourceCard.residingZoneInstanceId
    );

    // make sure it's still where it thinks it is
    if (residingZone.zoneEnum !== this.originZoneZoneEnum) {
      console.log('Returning out of resolve');
      return;
    }

    let originZone = ownerPlayer.zones.find(
      (c) => c.zoneEnum === this.originZoneZoneEnum
    );
    let destinationZone = ownerPlayer.zones.find(
      (c) => c.zoneEnum === this.destinationZoneZoneEnum
    );

    originZone.removeCard(sourceCard);
    destinationZone.addCard(sourceCard);
  }

  // #endregion

  // #region Available and Valid Checks

  override areTargetsAvailable(
    state: GameState,
    sourceEntity: AbilityKeywordRuntimeEntity
  ): boolean {
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

  // #region Effect To Text

  override effectToString(): string {
    let outText: string =
      'Move this card from ' +
      this.originZoneZoneEnum +
      ' to ' +
      this.destinationZoneZoneEnum +
      '. ';
    return outText;
  }

  // #endregion

  // #region Create Effect for Effect Solver

  public static createMoveCardEffect(
    originZoneZoneEnum: ZoneEnum,
    destinationZoneZoneEnum: ZoneEnum
  ): MoveCardEffect {
    return new MoveCardEffect(originZoneZoneEnum, destinationZoneZoneEnum);
  }

  // #endregion

  // #region JSON

  override toJSON(): any {
    return {
      effectType: EffectType[this.effectType],
      originZoneZoneEnum: ZoneEnum[this.originZoneZoneEnum],
      destinationZoneZoneEnum: ZoneEnum[this.destinationZoneZoneEnum],
    };
  }

  override clone(): RuntimeEffect {
    return new MoveCardEffect(
      this.originZoneZoneEnum,
      this.destinationZoneZoneEnum
    );
  }
}

// we don't need to register this with Effect becuase this won't be created from JSON
// and has it's own creation function

export default MoveCardEffect;
