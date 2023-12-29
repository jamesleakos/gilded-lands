import { ServerMessage } from '../MessageBase';
import PlayerInfo from '../../Player/PlayerInfo';
import GameManager from '../../Game/GameManager';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class ServerSendingGamestateForRejoin extends ServerMessage {
  public turn: number;
  public phaseIndex: number;
  public rngSeed: number;
  public player: PlayerInfo;
  public opponent: PlayerInfo;
  public gameManager: GameManager;

  constructor(
    recipientUserId: string,
    turn: number,
    phaseIndex: number,
    rngSeed: number,
    player: PlayerInfo,
    opponent: PlayerInfo,
    gameManger: GameManager
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.ServerSendingGamestateForRejoin;
    this.turn = turn;
    this.phaseIndex = phaseIndex;
    this.rngSeed = rngSeed;
    this.player = player;
    this.opponent = opponent;
    this.gameManager = gameManger;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      turn: this.turn,
      phaseIndex: this.phaseIndex,
      rngSeed: this.rngSeed,
      player: this.player.toJSONForPlayer(),
      opponent: this.opponent.toJSONForOpponent(),
      gameManger: this.gameManager.toJSON(),
    };
  }

  static fromJSON(json: any): ServerSendingGamestateForRejoin {
    return new ServerSendingGamestateForRejoin(
      json.recipientUserId,
      json.turn,
      json.phaseIndex,
      json.rngSeed,
      PlayerInfo.fromRuntimeJSON(json.player),
      PlayerInfo.fromRuntimeJSON(json.opponent),
      GameManager.fromJSON(json.gameManger)
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.turn != null &&
      this.phaseIndex != null &&
      this.rngSeed != null &&
      this.player != null &&
      this.opponent != null &&
      this.gameManager != null
    );
  }
}
