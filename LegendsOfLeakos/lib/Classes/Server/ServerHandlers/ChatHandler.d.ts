import GameServer from '../GameServer';
import ServerHandler from '../ServerHandler';
export default class ChatHandler extends ServerHandler {
    constructor(gameServer: GameServer);
    registerNetworkHandlers(playerSockets: any): void;
    unregisterNetworkHandlers(playerSockets: any): void;
    protected onChat(playerSocket: any, data: any): void;
}
