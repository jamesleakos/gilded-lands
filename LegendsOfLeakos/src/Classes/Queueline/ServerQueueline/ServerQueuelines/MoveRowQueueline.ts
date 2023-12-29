import ServerQueueline from '../ServerQueueline';
import GameServer from '../../../Server/GameServer';
import RuntimeCard from '../../../Card/RuntimeCard';
import PlayerInfo from '../../../Player/PlayerInfo';
import ServerCardMovedRowMessage from '../../../Networking/Cards/MovedRow/ServerCardMovedRowMessage';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';
import MoveCardEffect from '../../../Effect/RuntimeEffects/MoveEffects/MoveCardEffect';
import EffectSolver from '../../../Game/EffectSolver';

class MoveRowQueueLine extends ServerQueueline {
  originZoneZoneEnum: number;
  destinationZoneZoneEnum: number;

  constructor(
    clientMessageId: string,
    movingCardInstanceId: number,
    sourcePlayerUserId: string,
    priority: number,
    originZoneZoneEnum: number,
    destinationZoneZoneEnum: number
  ) {
    super();
    this.fillBaseInfo(
      clientMessageId,
      movingCardInstanceId,
      sourcePlayerUserId,
      priority
    );
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
  }

  sendEffectToDoEffect(server: GameServer, queuePosition: number): void {
    // #region get objects
    const sourcePlayer = server.gameState.getPlayerInfoByUserId(
      this.sourcePlayerUserId
    );
    if (!sourcePlayer) {
      throw new Error('Source player not found');
    }

    const movingCard = server.gameState.getCardFromAnywhere(
      this.sourceCardInstanceId
    );
    if (!movingCard) {
      throw new Error('Moving card not found');
    }
    // #endregion

    // make effects
    const moveEffect = MoveCardEffect.createMoveCardEffect(
      this.originZoneZoneEnum,
      this.destinationZoneZoneEnum
    );

    // effect the effect
    EffectSolver.doEffect(
      server.gameState,
      movingCard.instanceId,
      moveEffect,
      []
    );

    // send message to players
    for (const sendToPlayer of server.gameState.players) {
      const msg = new ServerCardMovedRowMessage(
        sendToPlayer.userId,
        sourcePlayer.userId,
        movingCard.instanceId,
        this.originZoneZoneEnum,
        this.destinationZoneZoneEnum,
        queuePosition
      );
      server.sendToPlayer(
        NetworkProtocol.ServerCardMovedRow,
        msg,
        sendToPlayer.userId
      );
    }
  }
}

export default MoveRowQueueLine;
