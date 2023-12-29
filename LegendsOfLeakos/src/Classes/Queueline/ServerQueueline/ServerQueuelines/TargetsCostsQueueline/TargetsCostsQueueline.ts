import ServerQueueline from '../../ServerQueueline';
import GameServer from '../../../../Server/GameServer';
import RuntimeCard from '../../../../Card/RuntimeCard';
import PlayerInfo from '../../../../Player/PlayerInfo';
import TargetInfo from '../../../../Target/TargetInfo';
import RuntimeEffect from '../../../../Effect/RuntimeEffect';
import GetTargetsFromPlayerMessage from '../../../../Networking/Abilities/GetTargetsFromPlayerMessage';
import { NetworkProtocol } from '../../../../../Enums/NetworkProtocol';
import GameState from '../../../../Game/GameState';
import EffectSolver from '../../../../Game/EffectSolver';
import PayResourceCost from '../../../../PayResourceCost/PayResourceCost';

abstract class TargetsCostsQueueline extends ServerQueueline {
  targetInfoList: TargetInfo[] = [];
  effect: RuntimeEffect;
  paidCosts: PayResourceCost[] = [];
  effectIndex: number;

  setTargetInfoList(targetInfoList: TargetInfo[]): void {
    this.targetInfoList = [...targetInfoList];
  }

  areTargetsStillAvailable(server: GameServer): boolean {
    return this.effect.areTargetsAvailable(
      server.gameState,
      server.gameState.getCardFromAnywhere(this.sourceCardInstanceId)
    );
  }

  areAllSelectedTargetInfoItemsValid(server: GameServer): boolean {
    return this.effect.isAllTargetInfoValid(
      server.gameState.getCardFromAnywhere(this.sourceCardInstanceId),
      server.gameState,
      this.targetInfoList
    );
  }

  areTargetsStillRequired(server: GameServer): boolean {
    return this.targetInfoList.some((t) => t.targetsAreSelectedLater);
  }

  goOutForTargets(server: GameServer, queuePosition: number): void {
    const code = EffectSolver.getRandomNumber(10000);

    const msg = new GetTargetsFromPlayerMessage(
      this.sourcePlayerUserId,
      this.effect,
      this.sourceCardInstanceId,
      this.effect.targetCriterias(),
      code,
      queuePosition
    );

    server.targetInfoCode = code;

    server.sendToPlayer(
      NetworkProtocol.GetTargetsFromPlayer,
      msg,
      this.sourcePlayerUserId
    );
  }

  abstract sendEffectToDoEffect(
    server: GameServer,
    queuePosition: number
  ): void;
}

export default TargetsCostsQueueline;
