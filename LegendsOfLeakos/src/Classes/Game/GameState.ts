import GameManager from './GameManager';
import EffectSolver from './EffectSolver';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeZone from '../Zone/RuntimeZone';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';

class GameState {
  gameManager: GameManager;
  players: PlayerInfo[];
  currentTurn: number;
  currentPhaseIndex: number;
  rngSeed: number;
  blocks: {
    blockingCardInstanceId: number;
    blockedCardInstanceId: number;
    blockOrder: number;
  }[] = [];

  constructor(
    gameManager: GameManager,
    players: PlayerInfo[],
    currentTurn: number,
    currentPhaseIndex: number,
    rngSeed: number,
    blocks: {
      blockingCardInstanceId: number;
      blockedCardInstanceId: number;
      blockOrder: number;
    }[]
  ) {
    this.gameManager = gameManager;
    this.players = players;
    this.currentTurn = currentTurn;
    this.currentPhaseIndex = currentPhaseIndex;
    this.rngSeed = rngSeed;
    this.blocks = blocks;
  }

  // clone

  clone(): GameState {
    const clone = new GameState(
      this.gameManager,
      this.players.map((playerInfo) => playerInfo.clone()),
      this.currentTurn,
      this.currentPhaseIndex,
      this.rngSeed,
      this.blocks.map((b) => ({ ...b }))
    );
    return clone;
  }

  // blocking

  cardBlocking(
    blockingCardInstanceId: number,
    blockedCardInstanceId: number,
    blockOrder: number
  ): void {
    const blockingCard = this.getCardFromAnywhere(blockingCardInstanceId);
    if (!blockingCard) {
      throw new Error('blockingCard is null');
    }

    const blockedCard = this.getCardFromAnywhere(blockedCardInstanceId);
    if (!blockedCard) {
      throw new Error('blockedCard is null');
    }

    if (
      this.blocks.some(
        (b) => b.blockingCardInstanceId === blockingCardInstanceId
      )
    ) {
      throw new Error('blockingCard is already blocking');
    }

    const blocksOnTheSameCard = this.blocks.filter(
      (b) => b.blockedCardInstanceId === blockedCardInstanceId
    );

    // make sure there are no gaps in the blockOrder values
    if (blockOrder > blocksOnTheSameCard.length) {
      blockOrder = blocksOnTheSameCard.length;
    }

    for (const block of blocksOnTheSameCard) {
      if (block.blockOrder >= blockOrder) {
        block.blockOrder++;
      }
    }

    this.blocks.push({
      blockingCardInstanceId,
      blockedCardInstanceId,
      blockOrder,
    });
  }

  reorderBlockingCard(
    blockingCardInstanceId: number,
    newBlockOrder: number
  ): void {
    const blocksOnTheSameCard = this.blocks.filter(
      (b) => b.blockingCardInstanceId === blockingCardInstanceId
    );

    const thisBlock = this.blocks.find(
      (b) => b.blockingCardInstanceId === blockingCardInstanceId
    );

    if (!thisBlock) {
      throw new Error('block is null');
    }

    const oldBlockOrder = thisBlock.blockOrder;

    if (newBlockOrder < oldBlockOrder) {
      for (const block of blocksOnTheSameCard) {
        if (
          block.blockOrder >= newBlockOrder &&
          block.blockOrder < oldBlockOrder
        )
          block.blockOrder++;
      }
    } else if (newBlockOrder > oldBlockOrder) {
      for (const block of blocksOnTheSameCard) {
        if (
          block.blockOrder <= newBlockOrder &&
          block.blockOrder > oldBlockOrder
        )
          block.blockOrder--;
      }
    }

    thisBlock.blockOrder = newBlockOrder;
  }

  stopCardBlocking(blockingCardInstanceId: number): void {
    const blockingCard = this.getCardFromAnywhere(blockingCardInstanceId);
    if (!blockingCard) {
      throw new Error('blockingCard is null');
    }

    const blocksOnTheSameCard = this.blocks.filter(
      (b) => b.blockingCardInstanceId === blockingCardInstanceId
    );

    const thisBlock = this.blocks.find(
      (b) => b.blockingCardInstanceId === blockingCardInstanceId
    );

    if (!thisBlock) {
      throw new Error('block is null');
    }

    const oldBlockOrder = thisBlock.blockOrder;

    for (const block of blocksOnTheSameCard) {
      if (block.blockOrder > oldBlockOrder) block.blockOrder--;
    }

    this.blocks = this.blocks.filter(
      (b) => b.blockingCardInstanceId !== blockingCardInstanceId
    );
  }

  // get stuff

  getCardFromAnywhere(cardInstanceId: number): RuntimeCard | null {
    let tempCard: RuntimeCard | null = null;
    for (let playerInfo of this.players) {
      tempCard = playerInfo.getCardFromInstanceId(cardInstanceId);
      if (tempCard != null) return tempCard;
    }
    return tempCard;
  }

  getZoneByInstanceId(zoneInstanceId: number): RuntimeZone | null {
    for (let playerInfo of this.players) {
      const tempZone = playerInfo.getZoneFromInstanceId(zoneInstanceId);
      if (!!tempZone) return tempZone;
    }
    console.log(
      'did not find the zone:',
      zoneInstanceId,
      ' in players with zone instance ids:',
      this.players.map((p) => p.zones.map((z) => z.instanceId))
    );
    return null;
  }

  getZoneByZoneEnumAndUserId(
    zoneEnum: number,
    userId: string
  ): RuntimeZone | null {
    for (let playerInfo of this.players) {
      if (playerInfo.userId === userId) {
        const tempZone = playerInfo.getFriendlyZoneFromZoneEnum(zoneEnum);
        if (!!tempZone) return tempZone;
      }
    }
    console.log(
      'did not find the zone:',
      zoneEnum,
      ' in players with userId:',
      userId
    );
    return null;
  }

  getEntityFromAnywhere(instanceId: number): TargetableRuntimeEntity | null {
    for (let playerInfo of this.players) {
      for (let zone of playerInfo.zones) {
        if (zone.instanceId === instanceId) return zone;
        for (let enchantment of zone.enchantments) {
          if (enchantment.instanceId === instanceId) return enchantment;
        }

        for (let card of zone.cards) {
          if (card.instanceId === instanceId) return card;
          for (let enchantment of card.enchantments) {
            if (enchantment.instanceId === instanceId) return enchantment;
          }
        }
      }
    }

    console.log('did not find the entity');
    return null;
  }

  getPlayerInfoByUserId(userId: string): PlayerInfo | null {
    for (let playerInfo of this.players) {
      if (playerInfo.userId === userId) return playerInfo;
    }
    return null;
  }
}

export default GameState;
