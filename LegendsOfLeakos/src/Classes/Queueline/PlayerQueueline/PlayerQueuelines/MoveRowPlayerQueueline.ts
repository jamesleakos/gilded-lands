import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import { ZoneEnum } from '../../../../Enums/Zone';
import GameState from '../../../Game/GameState';

class MoveRowPlayerQueueline extends PlayerQueueline {
  originZoneZoneEnum: ZoneEnum;
  destinationZoneZoneEnum: ZoneEnum;

  constructor(
    myPlayerUserId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    queuePosition: number,
    originZoneZoneEnum: ZoneEnum,
    destinationZoneZoneEnum: ZoneEnum
  ) {
    super();
    this.fillBaseInfo(
      myPlayerUserId,
      sourceCardInstanceId,
      sourcePlayerUserId,
      queuePosition
    );
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
  }

  sendEffectToPlayer(gameState: GameState, myPlayer: Player): void {
    if (!myPlayer) {
      throw new Error('Player not found');
    }
    myPlayer.onCardMovedRow(
      this.sourceCardInstanceId,
      this.originZoneZoneEnum,
      this.destinationZoneZoneEnum
    );
  }

  actionToString(gameState: GameState): string {
    const sourcePlayer = gameState.getPlayerInfoByUserId(
      this.sourcePlayerUserId
    );
    const sourceCard = gameState.getCardFromAnywhere(this.sourceCardInstanceId);

    if (!sourcePlayer || !sourceCard) {
      throw new Error('Player or card not found');
    }

    return `${sourcePlayer.name}'s ${sourceCard.name} (Instance ID: ${sourceCard.instanceId}) moved from ${this.originZoneZoneEnum} to ${this.destinationZoneZoneEnum}`;
  }

  clone(): PlayerQueueline {
    return new MoveRowPlayerQueueline(
      this.myPlayerUserId,
      this.sourceCardInstanceId,
      this.sourcePlayerUserId,
      this.queuePosition,
      this.originZoneZoneEnum,
      this.destinationZoneZoneEnum
    );
  }
}

export default MoveRowPlayerQueueline;
