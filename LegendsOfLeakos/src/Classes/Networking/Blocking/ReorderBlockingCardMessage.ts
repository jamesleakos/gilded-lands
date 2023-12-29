import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class ReorderBlockingCardMessage extends ClientMessage {
  public blockingCardInstanceId: number;
  public newBlockingPosition: number;

  constructor(
    messageId: string,
    senderUserId: string,
    blockingCardInstanceId: number,
    newBlockingPosition: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.ReorderBlockingCard;
    this.blockingCardInstanceId = blockingCardInstanceId;
    this.newBlockingPosition = newBlockingPosition;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      blockingCardInstanceId: this.blockingCardInstanceId,
      newBlockingPosition: this.newBlockingPosition,
    };
  }

  static fromJSON(json: any): ReorderBlockingCardMessage {
    return new ReorderBlockingCardMessage(
      json.messageId,
      json.senderUserId,
      json.blockingCardInstanceId,
      json.newBlockingPosition
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() &&
      this.blockingCardInstanceId != null &&
      this.newBlockingPosition != null
    );
  }
}
