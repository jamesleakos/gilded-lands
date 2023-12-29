import {
  ZoneEnum,
  ZoneOwnerVisibility,
  ZoneOpponentVisibility,
} from '../../Enums/Zone';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeCard from '../Card/RuntimeCard';
import RuntimeEnchantment from '../Enchantment/RuntimeEnchantment';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';
import RuntimeEffect from '../Effect/RuntimeEffect';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
import { LibraryZone } from './LibraryZone';
import GameManager from '../Game/GameManager';
import GameProperties from '../Game/GameProperties';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';

class RuntimeZone extends TargetableRuntimeEntity {
  zoneEnum: ZoneEnum;
  cards: RuntimeCard[] = [];
  enchantments: RuntimeEnchantment[] = [];

  // I don't like the idea of these - it's hard to track and hard to copy
  // onZoneChanged: (numCards: number) => void;
  // onCardAdded: (card: RuntimeCard) => void;
  // onCardRemoved: (card: RuntimeCard) => void;

  constructor(
    instanceId: number,
    name: string,
    zoneEnum: ZoneEnum,
    ownerPlayerUserId: string,
    cards: RuntimeCard[],
    enchantments: RuntimeEnchantment[]
  ) {
    super();
    this.instanceId = instanceId;
    this.name = name;
    this.zoneEnum = zoneEnum;
    this.ownerPlayerUserId = ownerPlayerUserId;
    this.cards = cards;
    this.enchantments = enchantments;
  }

  preResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const enchantment of this.enchantments) {
      enchantment.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
    }

    for (const card of this.cards) {
      card.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
    }
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

    for (const card of this.cards) {
      card.postResolveEffect(e, sourceEntity, gameState, targetInfoList);
    }
  }

  // #region add and remove cards

  addCard(card: RuntimeCard): void {
    const cardToAdd = this.cards.find((c) => c.instanceId === card.instanceId);
    if (!!cardToAdd) {
      console.log(
        `ERROR: RuntimeZone.getLibraryZone: Cannot add card ${card.instanceId} to zone ${this.instanceId} because it already exists in that zone`
      );
      return;
    }

    if (
      this.getLibraryZone().hasMaxCards &&
      this.cards.length >= this.getLibraryZone().maxCards
    ) {
      console.log(
        `Cannot add card ${card.instanceId} to zone ${this.instanceId} because it is full`
      );
      return;
    }

    this.cards.push(card);
    card.residingZoneInstanceId = this.instanceId;
  }

  addCardCreatedByEffect(card: RuntimeCard): void {
    const cardToAdd = this.cards.find((c) => c.instanceId === card.instanceId);

    if (cardToAdd === undefined) {
      this.addCard(card);
    }
  }

  removeCard(card: RuntimeCard): void {
    const cardToRemove = this.cards.find(
      (c) => c.instanceId === card.instanceId
    );

    if (cardToRemove === undefined) {
      return;
    }

    this.cards = this.cards.filter(
      (c) => c.instanceId !== cardToRemove.instanceId
    );

    // if (this.onZoneChanged) {
    //   this.onZoneChanged(this.numCards);
    // }

    // if (this.onCardRemoved) {
    //   this.onCardRemoved(card);
    // }
  }

  // #endregion

  // #region utilities

  getLibraryZone(): LibraryZone {
    const lib = GameProperties.gameZones.find(
      (z: LibraryZone) => z.zoneEnum === this.zoneEnum
    );

    if (!lib) {
      console.log(
        `ERROR: RuntimeZone.getLibraryZone: Could not find library zone for ${this.zoneEnum}`
      );
      return;
    }

    return lib;
  }

  // #endregion

  // #region JSON

  clone = (): RuntimeZone => {
    const clone = new RuntimeZone(
      this.instanceId,
      this.name,
      this.zoneEnum,
      this.ownerPlayerUserId,
      this.cards.map((card) => RuntimeCard.fromRuntimeJSON(card.toJSON())),
      this.enchantments.map((enchantment) =>
        RuntimeEnchantment.fromRuntimeJSON(enchantment.toJSON())
      )
    );

    return clone;
  };

  toJSONFromRuntimeCopyAllCards(): any {
    return {
      instanceId: this.instanceId,
      name: this.name,
      zoneEnum: this.zoneEnum,
      ownerPlayerUserId: this.ownerPlayerUserId,
      cards: this.cards.map((c) => c.toJSON()),
      enchantments: this.enchantments.map((e) => e.toJSON()),
    };
  }

  toJSONForPlayer(): any {
    const libraryZone = this.getLibraryZone();
    const showCards =
      libraryZone.ownerVisibility === ZoneOwnerVisibility.Visible;

    return {
      instanceId: this.instanceId,
      name: this.name,
      zoneEnum: this.zoneEnum,
      ownerPlayerUserId: this.ownerPlayerUserId,
      cards: showCards ? this.cards.map((c) => c.toJSON()) : [],
      enchantments: this.enchantments.map((e) => e.toJSON()),
    };
  }

  toJSONForOpponent(): any {
    const libraryZone = this.getLibraryZone();
    const showCards =
      libraryZone.opponentVisibility === ZoneOpponentVisibility.Visible;

    return {
      instanceId: this.instanceId,
      name: this.name,
      zoneEnum: this.zoneEnum,
      ownerPlayerUserId: this.ownerPlayerUserId,
      cards: showCards ? this.cards.map((c) => c.toJSON()) : [],
      enchantments: this.enchantments.map((e) => e.toJSON()),
    };
  }

  static fromRuntimeJSON(json: any): RuntimeZone {
    const zone = new RuntimeZone(
      json.instanceId,
      json.name,
      json.zoneEnum,
      json.ownerPlayerUserId,
      json.cards.map((c: any) => RuntimeCard.fromRuntimeJSON(c)),
      json.enchantments.map((e: any) => RuntimeEnchantment.fromRuntimeJSON(e))
    );

    return zone;
  }

  //** Create a RuntimeZone from a Library Zone - NO cards or enchantments */
  static fromLibraryJSON(json: any) {
    const zone = new RuntimeZone(
      json.instanceId,
      json.name,
      json.zoneEnum,
      json.ownerPlayerUserId,
      [], // cards
      [] // enchantments
    );

    return zone;
  }

  // #endregion
}

export default RuntimeZone;
