import { ServerMessage } from '../../MessageBase';
import PlayerInfo from '../../../Player/PlayerInfo';
import gameProperties from '../../../Game/GameProperties';
import GameState from '../../../Game/GameState';
import GameManager from '../../../Game/GameManager';
import { ZoneEnum } from '../../../../Enums/Zone';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class StartGameMessage extends ServerMessage {
  public playerIndex: number;
  public turnDuration: number;
  public names: string[];
  public player: PlayerInfo;
  public opponent: PlayerInfo;
  public rngSeed: number;
  public gameManager: GameManager;

  constructor(
    recipientUserId: string,
    playerIndex: number,
    turnDuration: number,
    names: string[],
    player: PlayerInfo,
    opponent: PlayerInfo,
    rngSeed: number,
    gameManager: GameManager
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.StartGame;
    this.playerIndex = playerIndex;
    this.turnDuration = turnDuration;
    this.names = names;
    this.player = player;
    this.opponent = opponent;
    this.rngSeed = rngSeed;
    this.gameManager = gameManager;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      playerIndex: this.playerIndex,
      turnDuration: this.turnDuration,
      names: this.names,
      player: this.player.toJSONForPlayer(),
      opponent: this.opponent.toJSONForOpponent(),
      rngSeed: this.rngSeed,
      gameManger: this.gameManager.toJSON(),
    };
  }

  static fromJSON(json: any): StartGameMessage {
    return new StartGameMessage(
      json.recipientUserId,
      json.playerIndex,
      json.turnDuration,
      json.names,
      PlayerInfo.fromRuntimeJSON(json.player),
      PlayerInfo.fromRuntimeJSON(json.opponent),
      json.rngSeed,
      GameManager.fromJSON(json.gameManger)
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.playerIndex != null &&
      this.turnDuration != null &&
      this.names != null &&
      this.player != null &&
      this.opponent != null &&
      this.rngSeed != null &&
      this.gameManager != null
    );
  }
}
