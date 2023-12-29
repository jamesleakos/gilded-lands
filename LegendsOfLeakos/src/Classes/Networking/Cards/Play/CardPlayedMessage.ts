import { ServerMessage } from '../../MessageBase';
import RuntimeCard from '../../../Card/RuntimeCard';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class CardPlayedMessage extends ServerMessage {
  public sourcePlayerUserId: string;
  public card: RuntimeCard;
  public originZoneZoneEnum: number;
  public destinationZoneZoneEnum: number;
  public paidCosts: PayResourceCost[];
  public targetInfoList: TargetInfo[];
  public queuePosition: number;
  public info: string;

  constructor(
    recipientUserId: string,
    sourcePlayerUserId: string,
    card: RuntimeCard,
    originZoneZoneEnum: number,
    destinationZoneZoneEnum: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[],
    queuePosition: number,
    info: string
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.CardPlayed;
    this.sourcePlayerUserId = sourcePlayerUserId;
    this.card = card;
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
    this.paidCosts = paidCosts;
    this.targetInfoList = targetInfoList;
    this.queuePosition = queuePosition;
    this.info = info;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      sourcePlayerUserId: this.sourcePlayerUserId,
      card: this.card.toJSON(),
      originZoneZoneEnum: this.originZoneZoneEnum,
      destinationZoneZoneEnum: this.destinationZoneZoneEnum,
      paidCosts: this.paidCosts.map((cost) => cost.toJSON()),
      targetInfoList: this.targetInfoList.map((info) => info.toJSON()),
      queuePosition: this.queuePosition,
      info: this.info,
    };
  }

  static fromJSON(json: any): CardPlayedMessage {
    const paidCosts = json.paidCosts.map(PayResourceCost.fromJSON);
    const targetInfoList = json.targetInfoList.map(TargetInfo.fromJSON);
    return new CardPlayedMessage(
      json.recipientUserId,
      json.sourcePlayerUserId,
      RuntimeCard.fromRuntimeJSON(json.card),
      json.originZoneZoneEnum,
      json.destinationZoneZoneEnum,
      paidCosts.map((cost: any) => PayResourceCost.fromJSON(cost)),
      targetInfoList.map((info: any) => TargetInfo.fromJSON(info)),
      json.queuePosition,
      json.info
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.sourcePlayerUserId != null &&
      this.card != null &&
      this.originZoneZoneEnum != null &&
      this.destinationZoneZoneEnum != null &&
      this.paidCosts != null &&
      this.targetInfoList != null &&
      this.queuePosition != null &&
      this.info != null
    );
  }
}
