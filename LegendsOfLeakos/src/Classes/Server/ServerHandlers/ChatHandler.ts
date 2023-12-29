import { NetworkProtocol } from '../../../Enums/NetworkProtocol';
import SendChatTextMessage from '../../Networking/Chat/SendChatMessage';
import GameServer from '../GameServer';
import ServerHandler from '../ServerHandler';

export default class ChatHandler extends ServerHandler {
  constructor(gameServer: GameServer) {
    super(gameServer);
  }

  registerNetworkHandlers(playerSockets: any): void {
    for (let socket of playerSockets) {
      socket.on(
        NetworkProtocol[NetworkProtocol.SendChatTextMessage],
        (data: any) => {
          try {
            this.onChat(socket, data);
          } catch (error) {
            console.log('error: ', error);
          }
        }
      );
    }
  }

  unregisterNetworkHandlers(playerSockets: any): void {
    for (let socket of playerSockets) {
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.SendChatTextMessage]
      );
    }
  }

  protected onChat(playerSocket: any, data: any): void {
    const msg = SendChatTextMessage.fromJSON(data);

    const player = this.validateMessageAndReturnPlayer(playerSocket.id, msg);

    if (!player) {
      throw new Error('Player not found');
    }

    for (let player of this.gameServer.gameState.players) {
      this.gameServer.sendToPlayer(
        NetworkProtocol.SendChatTextMessage,
        msg,
        player.userId
      );
    }
  }
}
