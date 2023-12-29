import TargetsCostsQueueline from '../TargetsCostsQueueline';
import GameServer from '../../../../../Server/GameServer';
import RuntimeCard from '../../../../../Card/RuntimeCard';
import PlayerInfo from '../../../../../Player/PlayerInfo';
import TargetInfo from '../../../../../Target/TargetInfo';
import RuntimeEffect from '../../../../../Effect/RuntimeEffect';
import PayResourceCost from '../../../../../PayResourceCost/PayResourceCost';
import CardUpgradedMessage from '../../../../../Networking/Upgrades/CardUpgradedMessage';
import { NetworkProtocol } from '../../../../../../Enums/NetworkProtocol';
import EffectSolver from '../../../../../Game/EffectSolver';
import UpgradeCardEffect from '../../../../../Effect/RuntimeEffects/UpgradeEffects/UpgradeCardEffect';

class UpgradeCardQueueLine extends TargetsCostsQueueline {
  upgradeLevel: number;

  constructor(
    clientMessageId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    targetInfoList: TargetInfo[],
    paidCosts: PayResourceCost[],
    effect: RuntimeEffect,
    priority: number,
    upgradeLevel: number
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
    this.upgradeLevel = upgradeLevel;
  }

  sendEffectToDoEffect(server: GameServer, queuePosition: number): void {
    // first let's upgrade the card
    const upgradingCard = server.gameState.getCardFromAnywhere(
      this.sourceCardInstanceId
    );
    if (!upgradingCard) {
      throw new Error('Card not found');
    }

    const libraryCard = server.gameState.gameManager.cardLibrary.find(
      (card) => card.libraryId === upgradingCard.libraryId
    );
    if (!libraryCard) {
      throw new Error('Library card not found');
    }

    const upgradeEffect = UpgradeCardEffect.createUpgradeCardEffect(
      this.upgradeLevel
    );

    // upgrade the card
    EffectSolver.doEffect(
      server.gameState,
      this.sourceCardInstanceId,
      upgradeEffect,
      this.targetInfoList
    );

    // now we move on to the activated effect
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
      const msg = new CardUpgradedMessage(
        player.userId,
        this.sourcePlayerUserId,
        this.sourceCardInstanceId,
        this.upgradeLevel,
        this.paidCosts,
        this.targetInfoList,
        this.effect != null,
        queuePosition
      );
      server.sendToPlayer(NetworkProtocol.CardUpgraded, msg, player.userId);
    }
  }
}

export default UpgradeCardQueueLine;
