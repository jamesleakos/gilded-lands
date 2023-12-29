import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import { ZoneEnum } from '../../../../Enums/Zone';
import GameState from '../../../Game/GameState';

class PlayCardPlayerQueueLine extends PlayerQueueline {
  paidCosts: PayResourceCost[];
  targetInfoList: TargetInfo[];
  originZoneZoneEnum: ZoneEnum;
  destinationZoneZoneEnum: ZoneEnum;

  constructor(
    myPlayerUserId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    queuePosition: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[],
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
    this.paidCosts = paidCosts;
    this.targetInfoList = targetInfoList;
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
  }

  sendEffectToPlayer(gameState: GameState, myPlayer: Player): void {
    if (!myPlayer) {
      throw new Error('Player not found');
    }
    myPlayer.onCardPlayed(
      this.sourcePlayerUserId,
      this.sourceCardInstanceId,
      this.targetInfoList,
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

    return `${sourcePlayer.name}'s ${sourceCard.name} (Instance ID: ${sourceCard.instanceId}) was played to ${this.destinationZoneZoneEnum}`;
  }

  clone(): PlayerQueueline {
    return new PlayCardPlayerQueueLine(
      this.myPlayerUserId,
      this.sourceCardInstanceId,
      this.sourcePlayerUserId,
      this.queuePosition,
      this.paidCosts.map((x) => x.clone()),
      this.targetInfoList.map((x) => x.clone()),
      this.originZoneZoneEnum,
      this.destinationZoneZoneEnum
    );
  }
}

export default PlayCardPlayerQueueLine;
