import { ServerMessage } from '../../MessageBase';
import RuntimeCard from '../../../Card/RuntimeCard';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

/**
 * This message is used by the server to move cards that the player did not request to be moved.
 * ex. moving cards to the battle row on attack.
 * The cards do not need to start as visible to either player for this to work
 */

export default class ServerMovedCardMessage extends ServerMessage {
  public ownerPlayerUserId: string;
  public card: RuntimeCard;
  public originZoneZoneEnum: number;
  public destinationZoneZoneEnum: number;

  constructor(
    recipientUserId: string,
    ownerPlayerUserId: string,
    card: RuntimeCard,
    originZoneZoneEnum: number,
    destinationZoneZoneEnum: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.CardMoved;
    this.ownerPlayerUserId = ownerPlayerUserId;
    this.card = card;
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ownerPlayerUserId: this.ownerPlayerUserId,
      card: this.card.toJSON(),
      originZoneZoneEnum: this.originZoneZoneEnum,
      destinationZoneZoneEnum: this.destinationZoneZoneEnum,
    };
  }

  static fromJSON(json: any): ServerMovedCardMessage {
    return new ServerMovedCardMessage(
      json.recipientUserId,
      json.ownerPlayerUserId,
      RuntimeCard.fromRuntimeJSON(json.card),
      json.originZoneZoneEnum,
      json.destinationZoneZoneEnum
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.ownerPlayerUserId != null &&
      this.card != null &&
      this.originZoneZoneEnum != null &&
      this.destinationZoneZoneEnum != null
    );
  }
}
