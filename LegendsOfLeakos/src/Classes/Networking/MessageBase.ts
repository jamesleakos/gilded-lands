import GameManager from '../Game/GameManager';
import { NetworkProtocol } from '../../Enums/NetworkProtocol';

abstract class MessageBase {
  messageEnum: NetworkProtocol;
  // Define the toJSON method as abstract, forcing subclasses to implement it
  abstract toJSON(): any;
  abstract validate(): boolean;
}

abstract class ServerMessage extends MessageBase {
  // add a field for the recipient
  public recipientUserId: string;

  constructor(recipientUserId: string) {
    super();
    this.recipientUserId = recipientUserId;
  }

  toJSON() {
    return {
      messageEnum: NetworkProtocol[this.messageEnum],
      recipientUserId: this.recipientUserId,
    };
  }

  validate(): boolean {
    return this.recipientUserId != null && this.messageEnum != null;
  }
}

abstract class ClientMessage extends MessageBase {
  // add a field for the sender
  public messageId: string;
  public senderUserId: string;

  constructor(messageId: string, senderUserId: string) {
    super();
    this.messageId = messageId;
    this.senderUserId = senderUserId;
  }

  toJSON() {
    return {
      messageId: this.messageId,
      senderUserId: this.senderUserId,
    };
  }

  validate(): boolean {
    return (
      this.senderUserId != null &&
      this.messageId != null &&
      this.messageEnum != null
    );
  }

  clone(): ClientMessage {
    return Object.assign(Object.create(this), this);
  }

  static generateUniqueId(): string {
    return GameManager.generateUniqueId();
  }
}

export { ServerMessage, ClientMessage, MessageBase };
