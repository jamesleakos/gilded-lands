import { ClientMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class PlayerExploredLandMessage extends ClientMessage {
  public explored: boolean;
  public landTileId: number;

  constructor(
    messageId: string,
    senderUserId: string,
    explored: boolean,
    landTileId: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.PlayerExploredLand;
    this.explored = explored;
    this.landTileId = landTileId;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      explored: this.explored,
      landTileId: this.landTileId,
    };
  }

  static fromJSON(json: any): PlayerExploredLandMessage {
    return new PlayerExploredLandMessage(
      json.messageId,
      json.senderUserId,
      json.explored,
      json.landTileId
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return super.validate() && this.explored != null && this.landTileId != null;
  }
}
