import { ZoneEnum } from '../../../../Enums/Zone';
import { ServerMessage } from '../../MessageBase';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

/**
 * This message is for cards the player requested to be moved (currently, always between rows,
 * as cards that were played have their own message)
 */
export default class ServerCardMovedRowMessage extends ServerMessage {
  public ownerPlayerUserId: string;
  public movedCardInstanceId: number;
  public originZoneEnum: ZoneEnum;
  public destinationZoneEnum: ZoneEnum;
  public queuePosition: number;

  constructor(
    recipientUserId: string,
    ownerPlayerUserId: string,
    movedCardInstanceId: number,
    originZoneEnum: ZoneEnum,
    destinationZoneEnum: ZoneEnum,
    queuePosition: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.CardMoved;
    this.ownerPlayerUserId = ownerPlayerUserId;
    this.movedCardInstanceId = movedCardInstanceId;
    this.originZoneEnum = originZoneEnum;
    this.destinationZoneEnum = destinationZoneEnum;
    this.queuePosition = queuePosition;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ownerPlayerUserId: this.ownerPlayerUserId,
      movedCardInstanceId: this.movedCardInstanceId,
      originZoneEnum: this.originZoneEnum,
      destinationZoneEnum: this.destinationZoneEnum,
      queuePosition: this.queuePosition,
    };
  }

  static fromJSON(json: any): ServerCardMovedRowMessage {
    return new ServerCardMovedRowMessage(
      json.recipientUserId,
      json.ownerPlayerUserId,
      json.movedCardInstanceId,
      json.originZoneEnum,
      json.destinationZoneEnum,
      json.queuePosition
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.ownerPlayerUserId != null &&
      this.movedCardInstanceId != null &&
      this.originZoneEnum != null &&
      this.destinationZoneEnum != null &&
      this.queuePosition != null
    );
  }
}
