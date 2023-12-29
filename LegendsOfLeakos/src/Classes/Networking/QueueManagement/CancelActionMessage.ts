import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class CancelActionMessage extends ClientMessage {
  public messageIdToCancel: string;

  constructor(
    messageId: string,
    senderUserId: string,
    messageIdToCancel: string
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.CancelAction;
    this.messageIdToCancel = messageIdToCancel;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      messageIdToCancel: this.messageIdToCancel,
    };
  }

  static fromJSON(json: any): CancelActionMessage {
    return new CancelActionMessage(
      json.messageId,
      json.senderUserId,
      json.messageIdToCancel
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return super.validate() && this.messageIdToCancel != null;
  }
}
