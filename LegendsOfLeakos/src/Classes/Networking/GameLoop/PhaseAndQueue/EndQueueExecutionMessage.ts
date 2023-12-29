import { ServerMessage } from '../../MessageBase';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class EndQueueExecutionMessage extends ServerMessage {
  constructor(recipientUserId: string) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.EndExecuteQueue;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
    };
  }

  static fromJSON(json: any): EndQueueExecutionMessage {
    return new EndQueueExecutionMessage(json.recipientUserId);
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return this.recipientUserId != null;
  }
}
