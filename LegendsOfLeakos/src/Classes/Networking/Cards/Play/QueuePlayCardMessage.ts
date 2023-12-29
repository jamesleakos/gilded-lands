import { ClientMessage } from '../../MessageBase';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class QueuePlayCardMessage extends ClientMessage {
  public cardInstanceId: number;
  public destinationZoneZoneEnum: number;
  public paidCosts: PayResourceCost[];
  public targetInfoList: TargetInfo[];

  constructor(
    messageId: string,
    senderUserId: string,
    cardInstanceId: number,
    destinationZoneZoneEnum: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[]
  ) {
    // enum

    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.QueuePlayCard;
    this.cardInstanceId = cardInstanceId;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
    this.paidCosts = paidCosts;
    this.targetInfoList = targetInfoList;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      cardInstanceId: this.cardInstanceId,
      destinationZoneZoneEnum: this.destinationZoneZoneEnum,
      paidCosts: this.paidCosts.map((cost) => cost.toJSON()),
      targetInfoList: this.targetInfoList.map((info) => info.toJSON()),
    };
  }

  static fromJSON(json: any): QueuePlayCardMessage {
    const paidCosts = json.paidCosts.map((cost: any) =>
      PayResourceCost.fromJSON(cost)
    );
    const targetInfoList = json.targetInfoList.map((info: any) =>
      TargetInfo.fromJSON(info)
    );
    return new QueuePlayCardMessage(
      json.messageId,
      json.senderUserId,
      json.cardInstanceId,
      json.destinationZoneZoneEnum,
      paidCosts,
      targetInfoList
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() &&
      this.cardInstanceId != null &&
      this.destinationZoneZoneEnum != null &&
      this.paidCosts != null &&
      this.targetInfoList != null
    );
  }
}
