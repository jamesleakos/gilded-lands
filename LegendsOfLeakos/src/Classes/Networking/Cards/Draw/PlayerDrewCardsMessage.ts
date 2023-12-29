import { ServerMessage } from '../../MessageBase';
import RuntimeCard from '../../../Card/RuntimeCard';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

// what the server sends to the player when they draw cards
export default class PlayerDrewCardsMessage extends ServerMessage {
  public cards: RuntimeCard[];

  constructor(recipientUserId: string, cards: RuntimeCard[]) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.PlayerDrewCards;
    this.cards = cards;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      cards: this.cards.map((card) => card.toJSON()),
    };
  }

  static fromJSON(json: any): PlayerDrewCardsMessage {
    return new PlayerDrewCardsMessage(
      json.recipientUserId,
      json.cards.map((card: any) => RuntimeCard.fromRuntimeJSON(card))
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return this.recipientUserId != null && this.cards != null;
  }
}
