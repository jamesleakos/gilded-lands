import GameServer from '../GameServer';
import ServerHandler from '../ServerHandler';
export default class ConnectionHandler extends ServerHandler {
    constructor(gameServer: GameServer);
    registerNetworkHandlers(playerSockets: any): void;
    unregisterNetworkHandlers(playerSockets: any): void;
    onRejoinedGame(socket: any, data: any): void;
}
