import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class SendChatTextMessage extends ClientMessage {
  public recipientUserId: string;
  public text: string;

  constructor(
    messageId: string,
    senderUserId: string,
    recipientUserId: string,
    text: string
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.SendChatTextMessage;
    this.recipientUserId = recipientUserId;
    this.text = text;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      recipientUserId: this.recipientUserId,
      text: this.text,
    };
  }

  static fromJSON(json: any): SendChatTextMessage {
    return new SendChatTextMessage(
      json.messageId,
      json.senderUserId,
      json.recipientUserId,
      json.text
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() && this.recipientUserId != null && this.text != null
    );
  }
}
