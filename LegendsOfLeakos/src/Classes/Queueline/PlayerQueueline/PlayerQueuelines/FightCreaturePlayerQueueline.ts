import PlayerQueueline from '../PlayerQueueline';
import GameState from '../../../Game/GameState';
import PlayerInfo from '../../../Player/PlayerInfo';
import RuntimeCard from '../../../Card/RuntimeCard';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';
import Player from '../../../Player/Player';

export default class FightCreaturePlayerQueueLine extends PlayerQueueline {
  attackedCardInstanceId: number;

  constructor(
    myPlayerUserId: string,
    attackingCardInstanceId: number,
    attackedCardInstanceId: number,
    sourcePlayerUserId: string,
    queuePosition: number
  ) {
    super();
    this.fillBaseInfo(
      myPlayerUserId,
      attackingCardInstanceId,
      sourcePlayerUserId,
      queuePosition
    );
    this.attackedCardInstanceId = attackedCardInstanceId;
  }

  sendEffectToPlayer(gameState: GameState, myPlayer: Player): void {
    if (!myPlayer) {
      throw new Error('Player not found');
    }
    myPlayer.onCreatureAttacked(
      this.sourceCardInstanceId,
      this.attackedCardInstanceId
    );
  }

  actionToString(gameState: GameState): string {
    const sourcePlayer = gameState.getPlayerInfoByUserId(
      this.sourcePlayerUserId
    );
    const sourceCard = gameState.getCardFromAnywhere(this.sourceCardInstanceId);
    const attackedCard = gameState.getCardFromAnywhere(
      this.attackedCardInstanceId
    );

    if (!sourcePlayer || !sourceCard || !attackedCard) {
      throw new Error('Player or card not found');
    }

    return `${sourcePlayer.name}'s ${sourceCard.name} (Instance ID: ${sourceCard.instanceId}) fought ${attackedCard.name} (Instance ID: ${attackedCard.instanceId})`;
  }

  clone(): PlayerQueueline {
    return new FightCreaturePlayerQueueLine(
      this.myPlayerUserId,
      this.sourceCardInstanceId,
      this.attackedCardInstanceId,
      this.sourcePlayerUserId,
      this.queuePosition
    );
  }
}
