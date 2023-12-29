import ServerHandler from '../ServerHandler';
export default class TestHandler extends ServerHandler {
    constructor(gameServer: any);
    registerNetworkHandlers(playerSockets: any): void;
    unregisterNetworkHandlers(playerSockets: any): void;
}
