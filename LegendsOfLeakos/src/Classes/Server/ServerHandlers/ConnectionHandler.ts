import { NetworkProtocol } from '../../../Enums/NetworkProtocol';
import RejoinedGameMessage from '../../Networking/Connection/RejoinedGameMessage';
import ServerSendingGamestateForRejoin from '../../Networking/Connection/ServerSendingGamestateForRejoinMessage';
import PlayerInfo from '../../Player/PlayerInfo';
import GameServer from '../GameServer';
import ServerHandler from '../ServerHandler';

export default class ConnectionHandler extends ServerHandler {
  constructor(gameServer: GameServer) {
    super(gameServer);
  }

  public registerNetworkHandlers(playerSockets: any): void {
    for (let socket of playerSockets) {
      try {
        socket.on(
          NetworkProtocol[NetworkProtocol.RejoinedGame],
          (data: any) => {
            this.onRejoinedGame(socket, data);
          }
        );
        socket.on('dev-player-end-game', (data: any) => {
          console.log('in-game: dev-player-end-game');
          this.gameServer.endGame();
        });
      } catch (error) {
        console.log('error: ', error);
      }
    }
  }

  public unregisterNetworkHandlers(playerSockets: any): void {
    for (let socket of playerSockets) {
      socket.removeAllListeners(NetworkProtocol[NetworkProtocol.RejoinedGame]);
      socket.removeAllListeners('dev-player-end-game');
    }
  }

  public onRejoinedGame(socket: any, data: any): void {
    const player = this.gameServer.gameState.players.find(
      (player) => this.gameServer.userIdToSocketId(player.userId) === socket.id
    );

    if (!player) {
      throw new Error('Player not found / not a valid message');
    }

    const returnMessage = new ServerSendingGamestateForRejoin(
      player.userId,
      this.gameServer.gameState.currentTurn,
      this.gameServer.gameState.currentPhaseIndex,
      this.gameServer.gameState.rngSeed,
      player,
      this.gameServer.gameState.players.find(
        (p) => p.userId !== player.userId
      ) as PlayerInfo,
      this.gameServer.gameState.gameManager
    );

    this.gameServer.sendToPlayer(
      NetworkProtocol.ServerSendingGamestateForRejoin,
      returnMessage,
      player.userId
    );
  }
}
