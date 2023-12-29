import { ServerMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class CreatureAttackedMessage extends ServerMessage {
  public attackingPlayerUserId: string;
  public attackingCardInstanceId: number;
  public attackedCardInstanceId: number;
  public queuePosition: number;

  constructor(
    recipientUserId: string,
    attackingPlayerUserId: string,
    attackingCardInstanceId: number,
    attackedCardInstanceId: number,
    queuePosition: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.CreatureAttacked;
    this.attackingPlayerUserId = attackingPlayerUserId;
    this.attackingCardInstanceId = attackingCardInstanceId;
    this.attackedCardInstanceId = attackedCardInstanceId;
    this.queuePosition = queuePosition;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      attackingPlayerUserId: this.attackingPlayerUserId,
      attackingCardInstanceId: this.attackingCardInstanceId,
      attackedCardInstanceId: this.attackedCardInstanceId,
      queuePosition: this.queuePosition,
    };
  }

  static fromJSON(json: any): CreatureAttackedMessage {
    return new CreatureAttackedMessage(
      json.recipientUserId,
      json.attackingPlayerUserId,
      json.attackingCardInstanceId,
      json.attackedCardInstanceId,
      json.queuePosition
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.attackingPlayerUserId != null &&
      this.attackingCardInstanceId != null &&
      this.attackedCardInstanceId != null &&
      this.queuePosition != null
    );
  }
}
