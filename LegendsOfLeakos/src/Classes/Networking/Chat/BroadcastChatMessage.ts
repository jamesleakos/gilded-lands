import { ServerMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class BroadcastChatTextMessage extends ServerMessage {
  public senderUserId: string;
  public text: string;

  constructor(recipientUserId: string, senderUserId: string, text: string) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.BroadcastChatText;
    this.senderUserId = senderUserId;
    this.text = text;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      senderUserId: this.senderUserId,
      text: this.text,
    };
  }

  static fromJSON(json: any): BroadcastChatTextMessage {
    return new BroadcastChatTextMessage(
      json.recipientUserId,
      json.senderUserId,
      json.text
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return this.recipientUserId != null && this.text != null;
  }
}
