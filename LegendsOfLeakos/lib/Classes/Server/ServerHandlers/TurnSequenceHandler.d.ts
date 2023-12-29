import GameServer from '../GameServer';
import ServerHandler from '../ServerHandler';
export default class TurnSequenceHandler extends ServerHandler {
    constructor(gameServer: GameServer);
    registerNetworkHandlers(playerSockets: any): void;
    unregisterNetworkHandlers(playerSockets: any): void;
    protected OnPlayerFinishedAddedingToQueue(playerSocket: any, data: any): void;
}
