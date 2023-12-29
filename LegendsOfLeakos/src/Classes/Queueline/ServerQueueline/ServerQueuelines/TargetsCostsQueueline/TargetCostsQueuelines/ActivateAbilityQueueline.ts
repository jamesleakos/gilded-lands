import TargetsCostsQueueline from '../TargetsCostsQueueline';
import GameServer from '../../../../../Server/GameServer';
import RuntimeCard from '../../../../../Card/RuntimeCard';
import PlayerInfo from '../../../../../Player/PlayerInfo';
import TargetInfo from '../../../../../Target/TargetInfo';
import RuntimeEffect from '../../../../../Effect/RuntimeEffect';
import PayResourceCost from '../../../../../PayResourceCost/PayResourceCost';
import AbilityActivatedMessage from '../../../../../Networking/Abilities/AbilityActivatedMessage';
import { NetworkProtocol } from '../../../../../../Enums/NetworkProtocol';
import EffectSolver from '../../../../../Game/EffectSolver';

class ActivateAbilityQueueLine extends TargetsCostsQueueline {
  abilityIndex: number;

  constructor(
    clientMessageId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    targetInfoList: TargetInfo[],
    paidCosts: PayResourceCost[],
    effect: RuntimeEffect,
    priority: number,
    abilityIndex: number
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
    this.effect = effect;
    this.abilityIndex = abilityIndex;
  }

  sendEffectToDoEffect(server: GameServer, queuePosition: number): void {
    // first, we need to select any targets that are supposed to be selected by the server
    for (let i = 0; i < this.effect.targetCriterias.length; i++) {
      const targetCriteria = this.effect.targetCriterias()[i];
      if (!targetCriteria.playerSelectsTarget) {
        this.targetInfoList[i] = targetCriteria.autoSelectTargetInfo(
          this.sourceCardInstanceId,
          server.gameState
        );
      }
    }

    // send the effect over to effectsolver
    EffectSolver.doEffect(
      server.gameState,
      this.sourceCardInstanceId,
      this.effect,
      this.targetInfoList
    );

    // send the effect to the clients
    for (const player of server.gameState.players) {
      const msg = new AbilityActivatedMessage(
        player.userId,
        this.sourcePlayerUserId,
        this.sourceCardInstanceId,
        this.abilityIndex,
        this.paidCosts,
        this.targetInfoList,
        queuePosition
      );
      server.sendToPlayer(NetworkProtocol.AbilityActivated, msg, player.userId);
    }
  }
}

export default ActivateAbilityQueueLine;
