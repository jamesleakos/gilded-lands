import { ServerMessage } from '../../MessageBase';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class EndGameMessage extends ServerMessage {
  public winnerPlayerIndex: number;

  constructor(recipientUserId: string, winnerPlayerIndex: number) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.EndGame;
    this.winnerPlayerIndex = winnerPlayerIndex;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      winnerPlayerIndex: this.winnerPlayerIndex,
    };
  }

  static fromJSON(json: any): EndGameMessage {
    return new EndGameMessage(json.recipientSocketId, json.winnerPlayerIndex);
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return this.recipientUserId != null && this.winnerPlayerIndex != null;
  }
}
