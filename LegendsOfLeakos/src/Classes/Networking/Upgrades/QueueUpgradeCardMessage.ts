import { ClientMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class QueueUpgradeCardMessage extends ClientMessage {
  public cardInstanceId: number;
  public upgradeIndex: number;
  public paidCosts: PayResourceCost[];
  public targetInfoList: TargetInfo[];
  public actionPriority: number;

  constructor(
    messageId: string,
    senderUserId: string,
    cardInstanceId: number,
    upgradeIndex: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[],
    actionPriority: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.QueueUpgradeCard;
    this.cardInstanceId = cardInstanceId;
    this.upgradeIndex = upgradeIndex;
    this.paidCosts = paidCosts;
    this.targetInfoList = targetInfoList;
    this.actionPriority = actionPriority;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      cardInstanceId: this.cardInstanceId,
      upgradeIndex: this.upgradeIndex,
      paidCosts: this.paidCosts.map((cost) => cost.toJSON()),
      targetInfoList: this.targetInfoList.map((info) => info.toJSON()),
      actionPriority: this.actionPriority,
    };
  }

  static fromJSON(json: any): QueueUpgradeCardMessage {
    return new QueueUpgradeCardMessage(
      json.messageId,
      json.senderUserId,
      json.cardInstanceId,
      json.upgradeIndex,
      json.paidCosts.map(PayResourceCost.fromJSON),
      json.targetInfoList.map(TargetInfo.fromJSON),
      json.actionPriority
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() &&
      this.cardInstanceId != null &&
      this.upgradeIndex != null &&
      this.paidCosts != null &&
      this.targetInfoList != null &&
      this.actionPriority != null
    );
  }
}
