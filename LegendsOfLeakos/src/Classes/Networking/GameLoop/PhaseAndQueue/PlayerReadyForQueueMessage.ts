import { ClientMessage } from '../../MessageBase';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class PlayerReadyForQueueMessage extends ClientMessage {
  constructor(messageId: string, senderUserId: string) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.PlayerReadyForQueue;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
    };
  }

  static fromJSON(json: any): PlayerReadyForQueueMessage {
    return new PlayerReadyForQueueMessage(json.messageId, json.senderUserId);
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return super.validate();
  }
}
