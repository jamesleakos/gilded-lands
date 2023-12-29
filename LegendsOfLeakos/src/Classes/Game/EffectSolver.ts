import GameState from './GameState';
import RuntimeCard from '../Card/RuntimeCard';
import RuntimeEffect from '../Effect/RuntimeEffect';
import TargetInfo from '../Target/TargetInfo';
import MoveCardEffect from '../Effect/RuntimeEffects/MoveEffects/MoveCardEffect';
import UpgradeCardEffect from '../Effect/RuntimeEffects/UpgradeEffects/UpgradeCardEffect';
import { EffectType } from '../../Enums/Effect';
import { ZoneEnum, ZoneEnumMethods, ZoneRefreshType } from '../../Enums/Zone';
import TargetCriteria from '../Target/TargetCriteria';
import RuntimeZone from '../Zone/RuntimeZone';
import { LibraryZone } from '../Zone/LibraryZone';
import GameManager from './GameManager';
import GameProperties from './GameProperties';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';

abstract class EffectSolver {
  // #region On Methods for Turns and Phases

  static onRecruitmentPhaseStarted(gameState: GameState) {
    EffectSolver.resetBlockers(gameState);
    // reset all uses of all abilities
    for (let player of gameState.players) {
      for (let zone of player.zones) {
        for (let enchantment of zone.enchantments) {
          for (let ability of enchantment.abilities) {
            ability.usesRemaining = ability.usesPerTurn;
          }
        }
        for (let card of zone.cards) {
          for (let ability of card.abilities) {
            ability.usesRemaining = ability.usesPerTurn;
          }
          for (let enchantment of card.enchantments) {
            for (let ability of enchantment.abilities) {
              ability.usesRemaining = ability.usesPerTurn;
            }
          }
          console.log('card: ' + card);
          console.log('ability: ' + card.abilities[0]);
        }
      }
    }
    // DoEffect StartPhaseEffect if this is functionality that we need.
  }

  static onRecruitmentPhaseEnded(gameState: GameState) {
    EffectSolver.resetBlockers(gameState);
    // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  static onManeuverPhaseStarted(gameState: GameState) {
    EffectSolver.resetBlockers(gameState);
    // DoEffect StartPhaseEffect if this is functionality that we need.
    for (let player of gameState.players) {
      player.setPlayerManaFromLand();
    }
  }

  static onManeuverPhaseEnded(gameState: GameState) {
    // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  static onSkirmishPhaseStarted(gameState: GameState) {
    // DoEffect StartPhaseEffect if this is functionality that we need.
  }

  static onSkirmishPhaseEnded(gameState: GameState) {
    // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  static onBattlePhaseStarted(gameState: GameState) {
    // DoEffect StartPhaseEffect if this is functionality that we need.
  }

  static onBattlePhaseEnded(gameState: GameState) {
    this.resetBlockers(gameState);
    // DoEffect EndPhaseEffect if this is functionality that we need.
  }

  // #endregion

  // #region Blocking
  static resetBlockers(gameState: GameState) {
    gameState.blocks = [];
  }

  // #endregion

  // #region Utilities - random numbers
  static getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // #endregion

  // #region Main Functions - doEffect and updateStatBuffs

  static doEffect(
    gameState: GameState,
    sourceEntityInstanceId: number,
    effect: RuntimeEffect,
    targetInfoList: TargetInfo[]
  ) {
    let sourceEntity = gameState.getEntityFromAnywhere(
      sourceEntityInstanceId
    ) as AbilityKeywordRuntimeEntity;
    if (!sourceEntity) {
      throw new Error(
        'doEffect called with invalid sourceEntityInstanceId: ' +
          sourceEntityInstanceId
      );
    }

    let success = effect.preEffect(gameState, sourceEntity, targetInfoList);
    if (!success) {
      console.log(
        'preeffect failed for effect: ' + EffectType[effect.effectType]
      );
      return;
    }

    // order doesn't matter all that much for the other preresolves, becuase they
    // can all create new effects if they really need other thigns to respond to them
    for (let p of gameState.players) {
      for (let zone of p.zones) {
        let zoneDefinition = GameProperties.gameZones.find(
          (x: LibraryZone) => x.zoneEnum === zone.zoneEnum
        );
        if (zoneDefinition.refreshType === ZoneRefreshType.Dynamic) {
          zone.preResolveEffect(
            effect,
            sourceEntity,
            gameState,
            targetInfoList
          );
        }
      }
    }

    effect.resolve(gameState, sourceEntity, targetInfoList);

    for (let p of gameState.players) {
      for (let zone of p.zones) {
        let zoneDefinition = GameProperties.gameZones.find(
          (x: LibraryZone) => x.zoneEnum === zone.zoneEnum
        );
        if (zoneDefinition.refreshType === ZoneRefreshType.Dynamic) {
          zone.postResolveEffect(
            effect,
            sourceEntity,
            gameState,
            targetInfoList
          );
        }
      }
    }

    EffectSolver.updateStatBuffs(gameState);
    EffectSolver.checkForDeadCards(gameState);
  }

  static updateStatBuffs(gameState: GameState) {
    // update stat buffs
    // this bit just iterates through all stats - until marker
    for (let statPlayer of gameState.players) {
      for (let statZone of statPlayer.zones.filter((z) =>
        ZoneEnumMethods.isBoard(z.zoneEnum)
      )) {
        // this returns just the boards
        for (let statCard of statZone.cards) {
          for (let stat of statCard.getStatList()) {
            // marker - now we've got a stat
            // from here, we're going to iterate through all keywords and see if they want to affect our stat
            // first, we'll keep a record of the current effective value, because if it changes we want
            // to call an onValueChanged for the stat

            let oldEffectiveValue = stat.effectiveValue;

            // have to clear them before we add
            stat.buffs = [];

            // now we do our big loop with everything
            for (let player of gameState.players) {
              for (let zone of player.zones.filter((z) =>
                ZoneEnumMethods.isBoard(z.zoneEnum)
              )) {
                for (let enchantment of zone.enchantments) {
                  for (let keyword of enchantment.keywords) {
                    let outBuff = keyword.addStatBuff(
                      stat,
                      statCard,
                      gameState
                    );
                    if (outBuff != null) {
                      stat.addBuff(outBuff.value, outBuff.details);
                    }
                  }
                }

                for (let card of zone.cards) {
                  for (let keyword of card.keywords) {
                    let outBuff = keyword.addStatBuff(
                      stat,
                      statCard,
                      gameState
                    );
                    if (outBuff != null) {
                      stat.addBuff(outBuff.value, outBuff.details);
                    }
                  }

                  for (let enchantment of card.enchantments) {
                    for (let keyword of enchantment.keywords) {
                      let outBuff = keyword.addStatBuff(
                        stat,
                        statCard,
                        gameState
                      );
                      if (outBuff != null) {
                        stat.addBuff(outBuff.value, outBuff.details);
                      }
                    }
                  }
                }
              }
            }

            let outString = '';
            for (let buff of stat.buffs) {
              outString += buff.details;
            }

            // call the action - this should presumable update everything important as well
            if (
              stat.effectiveValue !== oldEffectiveValue &&
              stat.onValueChanged != null
            ) {
              stat.onValueChanged(oldEffectiveValue, stat.effectiveValue);
            }
          }
        }
      }
    }
  }

  static checkForDeadCards(gameState: GameState) {
    for (let player of gameState.players) {
      const playZones = player.zones.filter((z) =>
        ZoneEnumMethods.isBoard(z.zoneEnum)
      );
      for (let zone of playZones) {
        for (let card of zone.cards) {
          if (card.health.effectiveValue <= 0) {
            EffectSolver.doEffect(
              gameState,
              card.instanceId,
              MoveCardEffect.createMoveCardEffect(
                gameState.getZoneByInstanceId(card.residingZoneInstanceId)
                  .zoneEnum,
                ZoneEnum.Graveyard
              ),
              []
            );
          }
        }
      }
    }
  }

  // #endregion
}

export default EffectSolver;
