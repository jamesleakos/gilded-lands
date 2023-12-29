import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';

class ActivateAbilityPlayerQueueline extends PlayerQueueline {
  paidCosts: PayResourceCost[];
  targetInfoList: TargetInfo[];
  abilityIndex: number;

  constructor(
    myPlayerUserId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    queuePosition: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[],
    abilityIndex: number
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
    this.abilityIndex = abilityIndex;
  }

  sendEffectToPlayer(gameState: GameState, myPlayer: Player): void {
    if (!myPlayer) {
      throw new Error('Player not found');
    }
    myPlayer.onActivateAbility(
      this.sourceCardInstanceId,
      this.targetInfoList,
      this.abilityIndex
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

    return `${sourcePlayer.name}'s ${sourceCard.name} (Instance ID: ${sourceCard.instanceId}) activated ability ${this.abilityIndex}`;
  }

  clone(): PlayerQueueline {
    return new ActivateAbilityPlayerQueueline(
      this.myPlayerUserId,
      this.sourceCardInstanceId,
      this.sourcePlayerUserId,
      this.queuePosition,
      this.paidCosts.map((x) => x.clone()),
      this.targetInfoList.map((x) => x.clone()),
      this.abilityIndex
    );
  }
}

export default ActivateAbilityPlayerQueueline;
