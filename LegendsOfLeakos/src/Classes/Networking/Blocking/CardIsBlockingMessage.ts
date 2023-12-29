import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class CardIsBlockingMessage extends ClientMessage {
  public blockingCardInstanceId: number;
  public blockedCardInstanceId: number;
  public blockOrder: number;

  constructor(
    messageId: string,
    senderUserId: string,
    blockingCardInstanceId: number,
    blockedCardInstanceId: number,
    blockOrder: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.CardIsBlocking;
    this.blockingCardInstanceId = blockingCardInstanceId;
    this.blockedCardInstanceId = blockedCardInstanceId;
    this.blockOrder = blockOrder;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      blockingCardInstanceId: this.blockingCardInstanceId,
      blockedCardInstanceId: this.blockedCardInstanceId,
      blockOrder: this.blockOrder,
    };
  }

  static fromJSON(json: any): CardIsBlockingMessage {
    return new CardIsBlockingMessage(
      json.messageId,
      json.senderUserId,
      json.blockingCardInstanceId,
      json.blockedCardInstanceId,
      json.blockOrder
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() &&
      this.blockingCardInstanceId != null &&
      this.blockedCardInstanceId != null &&
      this.blockOrder != null
    );
  }
}
