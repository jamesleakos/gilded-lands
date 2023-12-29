import { ServerMessage } from '../../MessageBase';
import { ZoneEnum } from '../../../../Enums/Zone';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class MoveCardsMessage extends ServerMessage {
  public recipientUserId: string;
  public originZoneZoneEnum: ZoneEnum;
  public destinationZoneZoneEnum: ZoneEnum;
  public numCards: number;

  constructor(
    recipientUserId: string,
    originZoneZoneEnum: ZoneEnum,
    destinationZoneZoneEnum: ZoneEnum,
    numCards: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.CardsMoved;
    this.recipientUserId = recipientUserId;
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
    this.numCards = numCards;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      originZoneZoneEnum: this.originZoneZoneEnum,
      destinationZoneZoneEnum: this.destinationZoneZoneEnum,
      numCards: this.numCards,
    };
  }

  static fromJSON(json: any): MoveCardsMessage {
    return new MoveCardsMessage(
      json.recipientUserId,
      json.originZoneZoneEnum,
      json.destinationZoneZoneEnum,
      json.numCards
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.originZoneZoneEnum != null &&
      this.destinationZoneZoneEnum != null &&
      this.numCards != null
    );
  }
}
