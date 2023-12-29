import { ClientMessage } from '../Networking/MessageBase';
import PlayerInfo from '../Player/PlayerInfo';
import GameServer from './GameServer';

abstract class ServerHandler {
  // Convenient access to the server itself.
  public gameServer: GameServer;

  // Constructor.
  constructor(gameServer: GameServer) {
    this.gameServer = gameServer;
  }

  // This method is where subclasses should register to receive the network messages they are interested in.
  abstract registerNetworkHandlers(playerSockets: any): void;

  // This method is where subclasses should unregister to stop receiving the network messages they are interested in.
  abstract unregisterNetworkHandlers(playerSockets: any): void;

  public validateMessageAndReturnPlayer(
    playerSocketId: number,
    msg: ClientMessage
  ): PlayerInfo | null {
    if (!msg) {
      console.log('Message is null');
      return null;
    }
    // validate the message
    if (!msg.validate()) {
      console.log('Invalid message');
      return null;
    }

    // make sure that the senderUserId has the correct socket
    const checkedSocketId = this.gameServer.userIdToSocketId(msg.senderUserId);
    if (checkedSocketId !== playerSocketId) {
      console.log('Socket IDs do not match');
      return null;
    }

    // get the player from the userId
    const playerInfo = this.gameServer.gameState.getPlayerInfoByUserId(
      msg.senderUserId
    );
    if (!playerInfo) {
      console.log('Player not found');
      return null;
    }

    return playerInfo;
  }
}

export default ServerHandler;
