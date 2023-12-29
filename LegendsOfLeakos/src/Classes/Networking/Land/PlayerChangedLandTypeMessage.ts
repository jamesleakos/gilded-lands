import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class PlayerChangedLandTypeMessage extends ClientMessage {
  public playerUserId: string;
  public landTileId: number;
  public landType: number;

  constructor(
    messageId: string,
    senderUserId: string,
    landTileId: number,
    landType: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.PlayerChangedLandType;
    this.landTileId = landTileId;
    this.landType = landType;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      landTileId: this.landTileId,
      landType: this.landType,
    };
  }

  static fromJSON(json: any): PlayerChangedLandTypeMessage {
    return new PlayerChangedLandTypeMessage(
      json.messageId,
      json.senderUserId,
      json.landTileId,
      json.landType
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return super.validate() && this.landTileId != null && this.landType != null;
  }
}
