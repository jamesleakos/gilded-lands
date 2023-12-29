import ServerHandler from '../ServerHandler';
import GameServer from '../GameServer';
export default class PlayerRegistrationHandler extends ServerHandler {
    constructor(gameServer: GameServer);
    registerNetworkHandlers(playerSockets: any): void;
    unregisterNetworkHandlers(playerSockets: any): void;
    protected onRegisterPlayer(playerSocket: any, data: any): void;
}
