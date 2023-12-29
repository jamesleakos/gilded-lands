import { ServerMessage } from '../MessageBase';
import RuntimeEffect from '../../Effect/RuntimeEffect';
import TargetCriteria from '../../Target/TargetCriteria';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class GetTargetsFromPlayerMessage extends ServerMessage {
  public effect: RuntimeEffect;
  public cardInstanceId: number;
  public targetCriterias: TargetCriteria[];
  public targetInfoCode: number;
  public queueOrder: number;

  constructor(
    recipientUserId: string,
    effect: RuntimeEffect,
    currentCardInstanceId: number,
    targetCriterias: TargetCriteria[],
    targetInfoCode: number,
    queueOrder: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.GetTargetsFromPlayer;
    this.effect = effect;
    this.cardInstanceId = currentCardInstanceId;
    this.targetCriterias = targetCriterias;
    this.targetInfoCode = targetInfoCode;
    this.queueOrder = queueOrder;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      effect: this.effect.toJSON(),
      currentCardInstanceId: this.cardInstanceId,
      targetCriterias: this.targetCriterias.map((type) => type.toJSON()),
      targetInfoCode: this.targetInfoCode,
    };
  }

  static fromJSON(json: any): GetTargetsFromPlayerMessage {
    return new GetTargetsFromPlayerMessage(
      json.recipientUserId,
      RuntimeEffect.fromRuntimeJSON(json.effect),
      json.currentCardInstanceId,
      json.targetCriterias.map(TargetCriteria.fromRuntimeJSON),
      json.targetInfoCode,
      json.queueOrder
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.effect != null &&
      this.cardInstanceId != null &&
      this.targetCriterias != null &&
      this.targetInfoCode != null &&
      this.queueOrder != null
    );
  }
}
