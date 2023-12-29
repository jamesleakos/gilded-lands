import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class RejoinedGameMessage extends ClientMessage {
  constructor(messageId: string) {
    super(messageId, 'client rejoining game - will get a user id from server');
    this.messageEnum = NetworkProtocol.RejoinedGame;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
    };
  }

  static fromJSON(json: any): RejoinedGameMessage {
    return new RejoinedGameMessage(json.messageId);
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return this.senderUserId !== undefined && super.validate();
  }
}
