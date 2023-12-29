import {
  TargetTypeEnum,
  TargetableTypeSelectionEnum,
  BroadTargetTypeEnum,
  TargetMethods,
} from '../../Enums/Target';

import RuntimeCondition from '../Condition/RuntimeCondition';
import GameState from '../Game/GameState';
import TargetInfo from './TargetInfo';
import { ZoneEnum, ZoneEnumMethods } from '../../Enums/Zone';
import RuntimeCard from '../Card/RuntimeCard';
import RuntimeZone from '../Zone/RuntimeZone';

class TargetCriteria {
  name: string;
  targetTypeEnum: TargetTypeEnum;
  targetableTypeSelectionEnum: TargetableTypeSelectionEnum;
  minSelectionsRequired: number;
  maxSelectionsAllowed: number;
  minSelectionsThatMustRemain: number;
  conditions: Array<RuntimeCondition> = [];

  playerSelectsTarget: boolean;

  constructor(
    name: string,
    targetTypeEnum: TargetTypeEnum,
    minSelectionsRequired: number,
    maxSelectionsAllowed: number,
    minSelectionsThatMustRemain: number,
    targetableTypeSelectionEnum: TargetableTypeSelectionEnum,
    conditions: Array<RuntimeCondition>
  ) {
    this.name = name;
    this.targetTypeEnum = targetTypeEnum;
    this.minSelectionsRequired = minSelectionsRequired;
    this.maxSelectionsAllowed = maxSelectionsAllowed;
    this.minSelectionsThatMustRemain = minSelectionsThatMustRemain;
    this.targetableTypeSelectionEnum = targetableTypeSelectionEnum;

    this.playerSelectsTarget = TargetMethods.playerSelectsTargets(
      this.targetableTypeSelectionEnum
    );

    if (!TargetMethods.canBeTargetable(this.targetTypeEnum)) {
      if (this.playerSelectsTarget) {
        console.log('Player can never select that target');
      }
      this.conditions = conditions;
    }
  }

  autoSelectTargetInfo(
    sourceEntityInstanceId: number,
    gameState: GameState
  ): TargetInfo {
    let targetEntityInstanceIds: number[] = [];

    for (const player of gameState.players) {
      for (const zone of player.zones) {
        if (!ZoneEnumMethods.isBoard(zone.zoneEnum)) continue;
        if (
          this.isEntityAValidTarget(
            sourceEntityInstanceId,
            zone.instanceId,
            gameState
          )
        ) {
          targetEntityInstanceIds.push(zone.instanceId);
        }
        for (const card of zone.cards) {
          if (
            this.isEntityAValidTarget(
              sourceEntityInstanceId,
              card.instanceId,
              gameState
            )
          ) {
            targetEntityInstanceIds.push(card.instanceId);
          }
        }
      }
    }

    const outInstanceIds = targetEntityInstanceIds.slice(
      0,
      this.maxSelectionsAllowed
    );

    return new TargetInfo(outInstanceIds, outInstanceIds.length === 0, false);
  }

  areTargetsAvailable(
    sourceEntityInstanceId: number,
    gameState: GameState
  ): boolean {
    let targetEntityInstanceIds: number[] = [];

    for (const player of gameState.players) {
      for (const zone of player.zones) {
        if (!ZoneEnumMethods.isBoard(zone.zoneEnum)) continue;
        if (
          this.isEntityAValidTarget(
            sourceEntityInstanceId,
            zone.instanceId,
            gameState
          )
        ) {
          targetEntityInstanceIds.push(zone.instanceId);
        }
        for (const card of zone.cards) {
          if (
            this.isEntityAValidTarget(
              sourceEntityInstanceId,
              card.instanceId,
              gameState
            )
          ) {
            targetEntityInstanceIds.push(card.instanceId);
          }
        }
      }
    }

    return targetEntityInstanceIds.length >= this.minSelectionsRequired;
  }

  isTargetInfoValid(
    sourceEntityInstanceId: number,
    targetInfo: TargetInfo,
    gameState: GameState
  ): boolean {
    if (targetInfo.targetEntityInstanceIds.length < this.minSelectionsRequired)
      return false;
    if (targetInfo.targetEntityInstanceIds.length > this.maxSelectionsAllowed)
      return false;

    for (let targetInstanceId of targetInfo.targetEntityInstanceIds) {
      if (
        !this.isEntityAValidTarget(
          sourceEntityInstanceId,
          targetInstanceId,
          gameState
        )
      ) {
        return false;
      }
    }
    return true;
  }

  isEntityAValidTarget(
    sourceEntityInstanceId: number,
    targetEntityInstanceId: number,
    gameState: GameState
  ): boolean {
    const targetEntity = gameState.getEntityFromAnywhere(
      targetEntityInstanceId
    );
    if (!targetEntity) throw new Error('targetEntity is null');
    const sourceEntity = gameState.getEntityFromAnywhere(
      sourceEntityInstanceId
    );
    if (!sourceEntity) throw new Error('sourceEntity is null');

    switch (this.targetTypeEnum) {
      case TargetTypeEnum.TargetCreature:
        if (!(targetEntity instanceof RuntimeCard)) return false;
        break;
      case TargetTypeEnum.TargetOpponentCreature:
        if (!(targetEntity instanceof RuntimeCard)) return false;
        if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
          return false;
        }
        break;
      case TargetTypeEnum.TargetFriendlyCreature:
        if (!(targetEntity instanceof RuntimeCard)) return false;
        if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
          return false;
        }
        break;
      case TargetTypeEnum.TargetRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        break;
      case TargetTypeEnum.TargetOpponentRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
          return false;
        }
        break;
      case TargetTypeEnum.TargetFriendlyRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
          return false;
        }
        break;
      case TargetTypeEnum.OpponentFrontRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
          return false;
        }
        if ((targetEntity as RuntimeZone).zoneEnum !== ZoneEnum.FrontBoard)
          return false;
        break;
      case TargetTypeEnum.OpponentBackRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
          return false;
        }
        if ((targetEntity as RuntimeZone).zoneEnum !== ZoneEnum.BackBoard)
          return false;
        break;
      case TargetTypeEnum.FriendlyFrontRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
          return false;
        }
        if ((targetEntity as RuntimeZone).zoneEnum !== ZoneEnum.FrontBoard)
          return false;
        break;

      case TargetTypeEnum.FriendlyBackRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
          return false;
        }
        if ((targetEntity as RuntimeZone).zoneEnum !== ZoneEnum.BackBoard)
          return false;
        break;
      case TargetTypeEnum.FriendlyBattleRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId !== sourceEntity.ownerPlayerUserId) {
          return false;
        }
        if ((targetEntity as RuntimeZone).zoneEnum !== ZoneEnum.BattleBoard)
          return false;
        break;
      case TargetTypeEnum.OpponentBattleRow:
        if (!(targetEntity instanceof RuntimeZone)) return false;
        if (!ZoneEnumMethods.isBoard((targetEntity as RuntimeZone).zoneEnum))
          return false;
        if (targetEntity.ownerPlayerUserId === sourceEntity.ownerPlayerUserId) {
          return false;
        }
        if ((targetEntity as RuntimeZone).zoneEnum !== ZoneEnum.BattleBoard)
          return false;
        break;
      default:
        throw new Error(
          'Case Not Implemented for isTargetInfoValid: ' + this.targetTypeEnum
        );
    }
    for (let condition of this.conditions) {
      if (
        !condition.isTrue(
          targetEntity.instanceId,
          sourceEntity.instanceId,
          gameState
        )
      )
        return false;
    }
    return true;
  }

  // #region JSON

  clone(): TargetCriteria {
    return TargetCriteria.fromRuntimeJSON(this.toJSON());
  }

  toJSON(): any {
    return {
      name: this.name,
      targetTypeEnum: TargetTypeEnum[this.targetTypeEnum],
      minSelectionsRequired: this.minSelectionsRequired,
      maxSelectionsAllowed: this.maxSelectionsAllowed,
      minSelectionsThatMustRemain: this.minSelectionsThatMustRemain,
      targetableTypeSelectionEnum:
        TargetableTypeSelectionEnum[this.targetableTypeSelectionEnum],
      conditions: this.conditions.map((c) => c.toJSON()),
    };
  }

  static fromRuntimeJSON(targetTypeJSON: any): TargetCriteria {
    return new TargetCriteria(
      targetTypeJSON.name,
      TargetTypeEnum[
        targetTypeJSON.targetTypeEnum as keyof typeof TargetTypeEnum
      ],
      targetTypeJSON.minSelectionsRequired,
      targetTypeJSON.maxSelectionsAllowed,
      targetTypeJSON.minSelectionsThatMustRemain,
      TargetableTypeSelectionEnum[
        targetTypeJSON.targetableTypeSelectionEnum as keyof typeof TargetableTypeSelectionEnum
      ],
      targetTypeJSON.conditions.map((c: any) =>
        RuntimeCondition.fromRuntimeJSON(c)
      )
    );
  }

  static fromLibraryJSON(targetTypeJSON: any): TargetCriteria {
    return new TargetCriteria(
      targetTypeJSON.name,
      TargetTypeEnum[
        targetTypeJSON.targetTypeEnum as keyof typeof TargetTypeEnum
      ],
      targetTypeJSON.minSelectionsRequired,
      targetTypeJSON.maxSelectionsAllowed,
      targetTypeJSON.minSelectionsThatMustRemain,
      TargetableTypeSelectionEnum[
        targetTypeJSON.targetableTypeSelectionEnum as keyof typeof TargetableTypeSelectionEnum
      ],
      targetTypeJSON.conditions.map((c: any) =>
        RuntimeCondition.fromLibraryJSON(c)
      )
    );
  }

  static isLibraryJSONValid(json: any): boolean {
    if (typeof json.name !== 'string') {
      console.log('Invalid JSON: name is not a string');
      return false;
    }
    if (
      typeof json.targetTypeEnum !== 'string' ||
      !Object.values(TargetTypeEnum).includes(json.targetTypeEnum)
    ) {
      console.log('Invalid JSON: targetTypeEnum is not a valid TargetTypeEnum');
      return false;
    }
    if (typeof json.minSelectionsRequired !== 'number') {
      console.log('Invalid JSON: minSelectionsRequired is not a number');
      return false;
    }
    if (typeof json.maxSelectionsAllowed !== 'number') {
      console.log('Invalid JSON: maxSelectionsAllowed is not a number');
      return false;
    }
    if (typeof json.minSelectionsThatMustRemain !== 'number') {
      console.log('Invalid JSON: minSelectionsThatMustRemain is not a number');
      return false;
    }
    if (
      typeof json.targetableTypeSelectionEnum !== 'string' ||
      !Object.values(TargetableTypeSelectionEnum).includes(
        json.targetableTypeSelectionEnum
      )
    ) {
      console.log(
        'Invalid JSON: targetableTypeSelectionEnum is not a valid TargetableTypeSelectionEnum'
      );
      return false;
    }
    if (
      !Array.isArray(json.conditions) ||
      !json.conditions.every((c: any) => RuntimeCondition.isLibraryJSONValid(c))
    ) {
      console.log('Invalid JSON: conditions is not an array');
      return false;
    }
    return true;
  }

  // #endregion
}

export default TargetCriteria;
