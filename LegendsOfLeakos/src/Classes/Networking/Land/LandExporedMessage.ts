import { ServerMessage } from '../MessageBase';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class LandExploredMessage extends ServerMessage {
  public playerUserId: string;
  public explored: boolean;
  public landTileId: number;

  constructor(
    recipientUserId: string,
    playerUserId: string,
    explored: boolean,
    landTileId: number
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.LandExplored;
    this.playerUserId = playerUserId;
    this.explored = explored;
    this.landTileId = landTileId;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      playerUserId: this.playerUserId,
      explored: this.explored,
      landTileId: this.landTileId,
    };
  }

  static fromJSON(json: any): LandExploredMessage {
    return new LandExploredMessage(
      json.recipientUserId,
      json.playerUserId,
      json.explored,
      json.landTileId
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.playerUserId != null &&
      this.explored != null &&
      this.landTileId != null
    );
  }
}
