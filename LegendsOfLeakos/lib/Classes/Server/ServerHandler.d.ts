import { ClientMessage } from '../Networking/MessageBase';
import PlayerInfo from '../Player/PlayerInfo';
import GameServer from './GameServer';
declare abstract class ServerHandler {
    gameServer: GameServer;
    constructor(gameServer: GameServer);
    abstract registerNetworkHandlers(playerSockets: any): void;
    abstract unregisterNetworkHandlers(playerSockets: any): void;
    validateMessageAndReturnPlayer(playerSocketId: number, msg: ClientMessage): PlayerInfo | null;
}
export default ServerHandler;
