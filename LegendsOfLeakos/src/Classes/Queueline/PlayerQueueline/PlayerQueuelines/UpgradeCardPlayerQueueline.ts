import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';

class UpgradeCardPlayerQueueLine extends PlayerQueueline {
  paidCosts: PayResourceCost[];
  targetInfoList: TargetInfo[];
  upgradeLevel: number;
  useEffect: boolean;

  constructor(
    myPlayerUserId: string,
    sourceCardInstanceId: number,
    sourcePlayerUserId: string,
    queuePosition: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[],
    upgradeLevel: number,
    useEffect: boolean
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
    this.upgradeLevel = upgradeLevel;
    this.useEffect = useEffect;
  }

  sendEffectToPlayer(gameState: GameState, myPlayer: Player): void {
    if (!myPlayer) {
      throw new Error('Player not found');
    }
    myPlayer.onCardUpgraded(
      this.sourceCardInstanceId,
      this.targetInfoList,
      this.upgradeLevel
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

    return `${sourcePlayer.name}'s ${sourceCard.name} (Instance ID: ${sourceCard.instanceId}) was upgraded to level ${this.upgradeLevel}`;
  }

  clone(): PlayerQueueline {
    return new UpgradeCardPlayerQueueLine(
      this.myPlayerUserId,
      this.sourceCardInstanceId,
      this.sourcePlayerUserId,
      this.queuePosition,
      this.paidCosts.map((x) => x.clone()),
      this.targetInfoList.map((x) => x.clone()),
      this.upgradeLevel,
      this.useEffect
    );
  }
}

export default UpgradeCardPlayerQueueLine;
