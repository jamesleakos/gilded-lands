import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import RuntimeEffect from '../Effect/RuntimeEffect';
import Stat from '../Stat/Stat';
import RuntimeEnchantment from '../Enchantment/RuntimeEnchantment';
import TargetInfo from '../Target/TargetInfo';
import GameState from '../Game/GameState';
import RuntimeKeyword from '../Keyword/RuntimeKeyword/RuntimeKeyword';
import RuntimeAbility from '../Ability/RuntimeAbility';
import RuntimeZone from '../Zone/RuntimeZone';
import PlayerInfo from '../Player/PlayerInfo';
import LibraryCardEntry from '../RealmsAndLand/Biome/LibraryCardEntry';
import LibraryCard from './LibraryCard';
import GameProperties from '../Game/GameProperties';
import { ZoneEnum } from '../../Enums/Zone';

class RuntimeCard extends AbilityKeywordRuntimeEntity {
  libraryId: number;
  upgradesApplied: number[] = [];
  attack: Stat;
  health: Stat;
  priority: Stat;
  getStatList = (): Stat[] => [this.attack, this.health, this.priority];
  enchantments: RuntimeEnchantment[] = [];

  constructor(
    name: string,
    instanceId: number,
    ownerPlayerUserId: string,
    residingZoneInstanceId: number,
    keywords: RuntimeKeyword[],
    abilities: RuntimeAbility[],
    libraryId: number,
    upgradesApplied: number[],
    attack: Stat,
    health: Stat,
    priority: Stat,
    enchantments: RuntimeEnchantment[]
  ) {
    super();
    this.name = name;
    this.instanceId = instanceId;
    this.ownerPlayerUserId = ownerPlayerUserId;
    this.residingZoneInstanceId = residingZoneInstanceId;
    this.keywords = keywords;
    this.abilities = abilities;
    this.libraryId = libraryId;
    this.upgradesApplied = upgradesApplied;
    this.attack = attack;
    this.health = health;
    this.priority = priority;
    this.enchantments = enchantments;
  }

  // #region utilities

  isPlayable = (gameState: GameState): boolean => {
    const phase = GameProperties.gamePhases[gameState.currentPhaseIndex];
    if (!GameProperties.phasesCardsCanBePlayedIn.includes(phase.phaseEnum)) {
      return false;
    }

    const ownerPlayer = gameState.getPlayerInfoByUserId(this.ownerPlayerUserId);
    const libraryCard = this.getLibraryCard(gameState);

    if (!ownerPlayer.canPayResourceCosts(libraryCard.costs)) {
      return false;
    }

    const zone = gameState.getZoneByInstanceId(this.residingZoneInstanceId);
    if (!zone || zone.zoneEnum !== ZoneEnum.Hand) {
      return false;
    }

    return true;
  };

  getLibraryCard(gameState: GameState) {
    return gameState.gameManager.getCardFromLibraryId(this.libraryId);
  }

  // #endregion

  // #region post and pre resolve effect

  preResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
    }

    super.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
  }

  postResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.postResolveEffect(e, sourceEntity, gameState, targetInfoList);
    }

    super.postResolveEffect(e, sourceEntity, gameState, targetInfoList);
  }

  // #endregion

  // #region from LibraryCardEntry and from JSON (runtime and library)

  toJSON(): any {
    return {
      // super
      name: this.name,
      instanceId: this.instanceId,
      residingZoneInstanceId: this.residingZoneInstanceId,
      ownerPlayerUserId: this.ownerPlayerUserId,
      keywords: this.keywords.map((k) => k.toJSON()),
      abilities: this.abilities.map((a) => a.toJSON()),
      // super end
      libraryId: this.libraryId,
      upgradesApplied: this.upgradesApplied.map((u) => u),
      attack: this.attack.toJSON(),
      health: this.health.toJSON(),
      priority: this.priority.toJSON(),

      enchantments: this.enchantments.map((enchantment) =>
        enchantment.toJSON()
      ),
    };
  }

  static fromRuntimeJSON(json: any): RuntimeCard {
    return new RuntimeCard(
      json.name,
      json.instanceId,
      json.ownerPlayerUserId,
      json.residingZoneInstanceId,
      json.keywords.map((k: any) => RuntimeKeyword.fromRuntimeJSON(k)),
      json.abilities.map((a: any) => RuntimeAbility.fromRuntimeJSON(a)),
      json.libraryId,
      json.upgradesApplied,
      Stat.fromRuntimeJSON(json.attack),
      Stat.fromRuntimeJSON(json.health),
      Stat.fromRuntimeJSON(json.priority),
      json.enchantments.map((e: any) => RuntimeEnchantment.fromRuntimeJSON(e))
    );
  }

  static cardFromLibraryJSON = (
    json: any,
    zone: RuntimeZone,
    ownerPlayer: PlayerInfo
  ): RuntimeCard => {
    const instanceId = ownerPlayer.currentEntityInstanceId++;

    return new RuntimeCard(
      json.name,
      instanceId,
      ownerPlayer.userId,
      zone.instanceId,
      json.keywords.map((k: any) =>
        RuntimeKeyword.fromLibraryJSON(instanceId, k)
      ),
      json.abilities.map((a: any) => RuntimeAbility.fromLibraryJSON(a)),
      json.libraryId,
      [],
      Stat.fromLibraryJSON(json.attack),
      Stat.fromLibraryJSON(json.health),
      Stat.fromLibraryJSON(json.priority),
      []
    );
  };

  static cardsFromLibraryCardEntry = (
    json: any,
    zone: RuntimeZone,
    ownerPlayer: PlayerInfo,
    cardLibrary: LibraryCard[]
  ): RuntimeCard[] => {
    const libraryCardEntry = LibraryCardEntry.fromJSON(json);
    if (!libraryCardEntry) throw new Error('Invalid LibraryCardEntry');

    const libraryCard = cardLibrary.find(
      (c) => c.libraryId === libraryCardEntry.libraryId
    );

    const cards: RuntimeCard[] = [];

    for (let i = 0; i < libraryCardEntry.amount; i++) {
      const card = RuntimeCard.cardFromLibraryJSON(
        libraryCard.toJSON(),
        zone,
        ownerPlayer
      );
      cards.push(card);
    }

    return cards;
  };

  // #endregion
}

export default RuntimeCard;
