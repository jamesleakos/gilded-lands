import { ServerMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class CardUpgradedMessage extends ServerMessage {
  public playerUserId: string;
  public cardInstanceId: number;
  public upgradeLevel: number;
  public paidCosts: PayResourceCost[];
  public targetInfoList: TargetInfo[];
  public useEffect: boolean;
  public queuePosition: number;

  constructor(
    recipientUserId: string,
    playerUserId: string,
    cardInstanceId: number,
    upgradeLevel: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[],
    useEffect: boolean,
    queuePosition: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.CardUpgraded;
    this.playerUserId = playerUserId;
    this.cardInstanceId = cardInstanceId;
    this.upgradeLevel = upgradeLevel;
    this.paidCosts = paidCosts;
    this.targetInfoList = targetInfoList;
    this.useEffect = useEffect;
    this.queuePosition = queuePosition;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      playerUserId: this.playerUserId,
      cardInstanceId: this.cardInstanceId,
      upgradeLevel: this.upgradeLevel,
      paidCosts: this.paidCosts.map((cost) => cost.toJSON()),
      targetInfoList: this.targetInfoList.map((info) => info.toJSON()),
      useEffect: this.useEffect,
      queuePosition: this.queuePosition,
    };
  }

  static fromJSON(json: any): CardUpgradedMessage {
    return new CardUpgradedMessage(
      json.recipientUserId,
      json.playerUserId,
      json.cardInstanceId,
      json.upgradeLevel,
      json.paidCosts.map(PayResourceCost.fromJSON),
      json.targetInfoList.map(TargetInfo.fromJSON),
      json.useEffect,
      json.queuePosition
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.playerUserId != null &&
      this.cardInstanceId != null &&
      this.upgradeLevel != null &&
      this.paidCosts != null &&
      this.targetInfoList != null &&
      this.useEffect != null &&
      this.queuePosition != null
    );
  }
}
