import { ServerMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class AbilityActivatedMessage extends ServerMessage {
  public playerUsingAbilityUserId: string;
  public entityUsingAbilityInstanceId: number;
  public abilityIndex: number;
  public paidCosts: PayResourceCost[];
  public targetInfoList: TargetInfo[];
  public queuePosition: number;

  constructor(
    recipientUserId: string,
    playerUsingAbilityUserId: string,
    entityUsingAbilityInstanceId: number,
    abilityIndex: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[],
    queuePosition: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.AbilityActivated;
    this.playerUsingAbilityUserId = playerUsingAbilityUserId;
    this.entityUsingAbilityInstanceId = entityUsingAbilityInstanceId;
    this.abilityIndex = abilityIndex;
    this.paidCosts = paidCosts;
    this.targetInfoList = targetInfoList;
    this.queuePosition = queuePosition;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      playerUsingAbilityUserId: this.playerUsingAbilityUserId,
      entityUsingAbilityInstanceId: this.entityUsingAbilityInstanceId,
      abilityIndex: this.abilityIndex,
      paidCosts: this.paidCosts.map((cost) => cost.toJSON()),
      targetInfoList: this.targetInfoList.map((info) => info.toJSON()),
      queuePosition: this.queuePosition,
    };
  }

  static fromJSON(json: any): AbilityActivatedMessage {
    const paidCosts = json.paidCosts.map(PayResourceCost.fromJSON);
    const targetInfoList = json.targetInfoList.map(TargetInfo.fromJSON);
    return new AbilityActivatedMessage(
      json.recipientUserId,
      json.playerUsingAbilityUserId,
      json.entityUsingAbilityInstanceId,
      json.abilityIndex,
      paidCosts,
      targetInfoList,
      json.queuePosition
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.playerUsingAbilityUserId != null &&
      this.entityUsingAbilityInstanceId != null &&
      this.abilityIndex != null &&
      this.paidCosts != null &&
      this.targetInfoList != null &&
      this.queuePosition != null
    );
  }
}
