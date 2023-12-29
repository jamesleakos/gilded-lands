import GameServer from '../../Server/GameServer';
import RuntimeCard from '../../Card/RuntimeCard';
import PlayerInfo from '../../Player/PlayerInfo';

abstract class ServerQueueline {
  clientMessageId: string;
  sourceCardInstanceId: number;
  sourcePlayerUserId: string;
  priority: number;

  // can't give an abstract class a constructor
  fillBaseInfo(
    clientMessageId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    priority: number
  ): void {
    this.clientMessageId = clientMessageId;
    this.sourceCardInstanceId = sourceCardInstanceId;
    this.sourcePlayerUserId = sourcePlayerUserId;
    this.priority = priority;
  }

  abstract sendEffectToDoEffect(
    server: GameServer,
    queuePosition: number
  ): void;

  areTargetsStillAvailable(server: GameServer): boolean {
    return true;
  }

  areTargetsStillRequired(server: GameServer): boolean {
    return false;
  }

  areAllSelectedTargetInfoItemsValid(server: GameServer): boolean {
    return true;
  }

  goOutForTargets(server: GameServer, queuePosition: number): void {}
}

export default ServerQueueline;
