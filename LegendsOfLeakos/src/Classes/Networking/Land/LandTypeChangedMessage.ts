import { ServerMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class LandTypeChangedMessage extends ServerMessage {
  public playerUserId: string;
  public landTileId: number;
  public landType: number;

  constructor(
    recipientUserId: string,
    playerUserId: string,
    landTileId: number,
    landType: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.LandTypeChanged;
    this.playerUserId = playerUserId;
    this.landTileId = landTileId;
    this.landType = landType;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      playerUserId: this.playerUserId,
      landTileId: this.landTileId,
      landType: this.landType,
    };
  }

  static fromJSON(json: any): LandTypeChangedMessage {
    return new LandTypeChangedMessage(
      json.recipientUserId,
      json.playerUserId,
      json.landTileId,
      json.landType
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.playerUserId != null &&
      this.landTileId != null &&
      this.landType != null
    );
  }
}
