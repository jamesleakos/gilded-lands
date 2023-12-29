import ServerQueueline from '../ServerQueueline';
import GameServer from '../../../Server/GameServer';
import RuntimeCard from '../../../Card/RuntimeCard';
import PlayerInfo from '../../../Player/PlayerInfo';
import CreatureAttackedMessage from '../../../Networking/Attacking/CreatureAttackedMessage';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';
import AttackEffect from '../../../Effect/RuntimeEffects/AttackEffects/AttackEffect';
import EffectSolver from '../../../Game/EffectSolver';

class FightCreatureQueueLine extends ServerQueueline {
  attackedCardInstanceId: number;

  constructor(
    clientMessageId: string,
    attackingCardInstanceId: number,
    attackedCardInstanceId: number,
    sourcePlayerUserId: string,
    priority: number
  ) {
    super();
    this.fillBaseInfo(
      clientMessageId,
      attackingCardInstanceId,
      sourcePlayerUserId,
      priority
    );
    this.attackedCardInstanceId = attackedCardInstanceId;
  }

  sendEffectToDoEffect(server: GameServer, queuePosition: number): void {
    // #region get objects
    const sourcePlayer = server.gameState.getPlayerInfoByUserId(
      this.sourcePlayerUserId
    );
    if (!sourcePlayer) {
      throw new Error('Source player not found');
    }

    const attackingCard = server.gameState.getCardFromAnywhere(
      this.sourceCardInstanceId
    );
    if (!attackingCard) {
      throw new Error('Attacking card not found');
    }

    const attackedCard = server.gameState.getCardFromAnywhere(
      this.attackedCardInstanceId
    );
    if (!attackedCard) {
      throw new Error('Attacked card not found');
    }
    // #endregion

    // make effects
    const fightEffect = AttackEffect.createFightEffect();

    const tempTargetInfo = AttackEffect.createFightTargetInfoList(
      this.attackedCardInstanceId
    );

    // effect the effect
    EffectSolver.doEffect(
      server.gameState,
      attackingCard.instanceId,
      fightEffect,
      tempTargetInfo
    );

    // send CardAttackedToPlayers
    for (const sendToPlayer of server.gameState.players) {
      const msg = new CreatureAttackedMessage(
        sendToPlayer.userId,
        sourcePlayer.userId,
        attackingCard.instanceId,
        attackedCard.instanceId,
        queuePosition
      );
      server.sendToPlayer(
        NetworkProtocol.CreatureAttacked,
        msg,
        sendToPlayer.userId
      );
    }
  }
}

export default FightCreatureQueueLine;
