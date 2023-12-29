import { ClientMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class QueueActivateAbilityMessage extends ClientMessage {
  public sourceEntityInstanceId: number;
  public abilityIndex: number;
  public paidCosts: PayResourceCost[];
  public targetInfoList: TargetInfo[];

  constructor(
    messageId: string,
    senderUserId: string,
    sourceEntityInstanceId: number,
    abilityIndex: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[]
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.QueueActivateAbility;
    this.sourceEntityInstanceId = sourceEntityInstanceId;
    this.abilityIndex = abilityIndex;
    this.paidCosts = paidCosts;
    this.targetInfoList = targetInfoList;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      sourceEntityInstanceId: this.sourceEntityInstanceId,
      abilityIndex: this.abilityIndex,
      paidCosts: this.paidCosts.map((cost) => cost.toJSON()),
      targetInfoList: this.targetInfoList.map((info) => info.toJSON()),
    };
  }

  static fromJSON(json: any): QueueActivateAbilityMessage {
    const paidCosts = json.paidCosts.map(PayResourceCost.fromJSON);
    const targetInfoList = json.targetInfoList.map(TargetInfo.fromJSON);
    return new QueueActivateAbilityMessage(
      json.messageId,
      json.senderUserId,
      json.sourceEntityInstanceId,
      json.abilityIndex,
      paidCosts,
      targetInfoList
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() &&
      this.sourceEntityInstanceId != null &&
      this.abilityIndex != null &&
      this.paidCosts != null &&
      this.targetInfoList != null
    );
  }
}
