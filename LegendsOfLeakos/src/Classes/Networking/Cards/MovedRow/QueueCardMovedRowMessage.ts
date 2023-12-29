import { ClientMessage } from '../../MessageBase';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class QueueCardMovedRowMessage extends ClientMessage {
  public movedCardInstanceId: number;
  public originZoneZoneEnum: number;
  public destinationZoneZoneEnum: number;

  constructor(
    messageId: string,
    senderUserId: string,
    movedCardInstanceId: number,
    originZoneZoneEnum: number,
    destinationZoneZoneEnum: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.PlayerCardMovedRow;
    this.movedCardInstanceId = movedCardInstanceId;
    this.originZoneZoneEnum = originZoneZoneEnum;
    this.destinationZoneZoneEnum = destinationZoneZoneEnum;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      movedCardInstanceId: this.movedCardInstanceId,
      originZoneZoneEnum: this.originZoneZoneEnum,
      destinationZoneZoneEnum: this.destinationZoneZoneEnum,
    };
  }

  static fromJSON(json: any): QueueCardMovedRowMessage {
    return new QueueCardMovedRowMessage(
      json.messageId,
      json.senderUserId,
      json.movedCardInstanceId,
      json.originZoneZoneEnum,
      json.destinationZoneZoneEnum
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() &&
      this.movedCardInstanceId != null &&
      this.originZoneZoneEnum != null &&
      this.destinationZoneZoneEnum != null
    );
  }
}
