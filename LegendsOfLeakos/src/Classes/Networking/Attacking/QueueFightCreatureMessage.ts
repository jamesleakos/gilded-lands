import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class QueueFightCreatureMessage extends ClientMessage {
  public attackingCardInstanceId: number;
  public attackedCardInstanceId: number;

  constructor(
    messageId: string,
    senderUserId: string,
    attackingCardInstanceId: number,
    attackedCardInstanceId: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.QueueFightCreature;
    this.attackingCardInstanceId = attackingCardInstanceId;
    this.attackedCardInstanceId = attackedCardInstanceId;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      attackingCardInstanceId: this.attackingCardInstanceId,
      attackedCardInstanceId: this.attackedCardInstanceId,
    };
  }

  static fromJSON(json: any): QueueFightCreatureMessage {
    return new QueueFightCreatureMessage(
      json.messageId,
      json.senderUserId,
      json.attackingCardInstanceId,
      json.attackedCardInstanceId
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() &&
      this.attackingCardInstanceId != null &&
      this.attackedCardInstanceId != null
    );
  }
}
