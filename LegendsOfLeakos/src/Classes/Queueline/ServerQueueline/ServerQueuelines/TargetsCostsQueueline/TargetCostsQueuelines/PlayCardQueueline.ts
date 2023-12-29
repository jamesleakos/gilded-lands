import TargetsCostsQueueline from '../TargetsCostsQueueline';
import GameServer from '../../../../../Server/GameServer';
import RuntimeCard from '../../../../../Card/RuntimeCard';
import PlayerInfo from '../../../../../Player/PlayerInfo';
import TargetInfo from '../../../../../Target/TargetInfo';
import RuntimeEffect from '../../../../../Effect/RuntimeEffect';
import PayResourceCost from '../../../../../PayResourceCost/PayResourceCost';
import CardPlayedMessage from '../../../../../Networking/Cards/Play/CardPlayedMessage';
import { NetworkProtocol } from '../../../../../../Enums/NetworkProtocol';
import { ZoneEnum } from '../../../../../../Enums/Zone';
import EffectSolver from '../../../../../Game/EffectSolver';
import MoveCardEffect from '../../../../../Effect/RuntimeEffects/MoveEffects/MoveCardEffect';

class PlayCardQueueLine extends TargetsCostsQueueline {
  originZoneZoneEnum: ZoneEnum;
  destinationZoneZoneEnum: ZoneEnum;

  constructor(
    clientMessageId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    targetInfoList: TargetInfo[],
    paidCosts: PayResourceCost[],
    priority: number,
    originZoneZoneEnum: ZoneEnum,
    destinationZoneZoneEnum: ZoneEnum
  ) {
    super();
    this.fillBaseInfo(
      clientMessageId,
      sourceCardInstanceId,
      sourcePlayerUserId,
      priority
    );

    this.targetInfoList = [...targetInfoList];
    this.paidCosts = [...paidCosts];
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
  }

  sendEffectToDoEffect(server: GameServer, queuePosition: number): void {
    // send the effect over to effectsolver
    const moveEffect = MoveCardEffect.createMoveCardEffect(
      this.originZoneZoneEnum,
      this.destinationZoneZoneEnum
    );

    EffectSolver.doEffect(
      server.gameState,
      this.sourceCardInstanceId,
      moveEffect,
      this.targetInfoList
    );

    // send the effect to the clients
    for (const player of server.gameState.players) {
      const msg = new CardPlayedMessage(
        player.userId,
        this.sourcePlayerUserId,
        server.gameState.getCardFromAnywhere(this.sourceCardInstanceId),
        this.originZoneZoneEnum,
        this.destinationZoneZoneEnum,
        this.paidCosts,
        this.targetInfoList,
        queuePosition,
        ''
      );
      server.sendToPlayer(NetworkProtocol.CardPlayed, msg, player.userId);
    }
  }
}

export default PlayCardQueueLine;
