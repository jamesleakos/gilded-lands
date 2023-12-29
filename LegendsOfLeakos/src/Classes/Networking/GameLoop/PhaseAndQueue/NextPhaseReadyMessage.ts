import { ServerMessage } from '../../MessageBase';
import PlayerInfo from '../../../Player/PlayerInfo';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class NextPhaseReadyMessage extends ServerMessage {
  public turn: number;
  public phaseIndex: number;
  public player: PlayerInfo;
  public opponent: PlayerInfo;

  constructor(
    recipientUserId: string,
    turn: number,
    phaseIndex: number,
    player: PlayerInfo,
    opponent: PlayerInfo
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.NextPhaseReady;
    this.turn = turn;
    this.phaseIndex = phaseIndex;
    this.player = player;
    this.opponent = opponent;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      turn: this.turn,
      phaseIndex: this.phaseIndex,
      player: this.player.toJSONForPlayer(),
      opponent: this.opponent.toJSONForOpponent(),
    };
  }

  static fromJSON(json: any): NextPhaseReadyMessage {
    return new NextPhaseReadyMessage(
      json.recipientUserId,
      json.turn,
      json.phaseIndex,
      PlayerInfo.fromRuntimeJSON(json.player),
      PlayerInfo.fromRuntimeJSON(json.opponent)
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.turn != null &&
      this.phaseIndex != null &&
      this.player != null &&
      this.opponent != null
    );
  }
}
