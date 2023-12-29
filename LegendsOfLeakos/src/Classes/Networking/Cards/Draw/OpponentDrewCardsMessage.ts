import { ServerMessage } from '../../MessageBase';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class OpponentDrewCardsMessage extends ServerMessage {
  public numCards: number;

  constructor(recipientUserId: string, numCards: number) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.OpponentDrewCards;
    this.numCards = numCards;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      numCards: this.numCards,
    };
  }

  static fromJSON(json: any): OpponentDrewCardsMessage {
    return new OpponentDrewCardsMessage(json.recipientUserId, json.numCards);
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return this.recipientUserId != null && this.numCards != null;
  }
}
