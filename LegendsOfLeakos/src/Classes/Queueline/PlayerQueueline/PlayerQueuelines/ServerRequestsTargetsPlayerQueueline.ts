import RuntimeEffect from '../../../Effect/RuntimeEffect';
import GameState from '../../../Game/GameState';
import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';

class ServerRequestsTargetsPlayerQueueline extends PlayerQueueline {
  effect: RuntimeEffect;
  targetInfoCode: number;

  constructor(
    myPlayerUserId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    queuePosition: number,
    effect: RuntimeEffect,
    targetInfoCode: number
  ) {
    super();
    this.fillBaseInfo(
      myPlayerUserId,
      sourceCardInstanceId,
      sourcePlayerUserId,
      queuePosition
    );
    this.effect = effect;
    this.targetInfoCode = targetInfoCode;
  }

  sendEffectToPlayer(gameState: GameState, myPlayer: Player): void {
    if (!myPlayer) {
      throw new Error('Player not found');
    }
    myPlayer.onServerRequestsTargets(
      this.effect,
      this.sourceCardInstanceId,
      this.effect.targetCriterias(),
      this.targetInfoCode
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

    return `${sourcePlayer.name}'s ${sourceCard.name} (Instance ID: ${sourceCard.instanceId}) is requesting targets`;
  }

  clone(): ServerRequestsTargetsPlayerQueueline {
    return new ServerRequestsTargetsPlayerQueueline(
      this.myPlayerUserId,
      this.sourceCardInstanceId,
      this.sourcePlayerUserId,
      this.queuePosition,
      this.effect.clone(),
      this.targetInfoCode
    );
  }
}

export default ServerRequestsTargetsPlayerQueueline;
