import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class StopCardBlockingMessage extends ClientMessage {
  public blockingCardInstanceId: number;

  constructor(
    messageId: string,
    senderUserId: string,
    blockingCardInstanceId: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.StopCardBlocking;
    this.blockingCardInstanceId = blockingCardInstanceId;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      blockingCardInstanceId: this.blockingCardInstanceId,
    };
  }

  static fromJSON(json: any): StopCardBlockingMessage {
    return new StopCardBlockingMessage(
      json.messageId,
      json.senderUserId,
      json.blockingCardInstanceId
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return super.validate() && this.blockingCardInstanceId != null;
  }
}
