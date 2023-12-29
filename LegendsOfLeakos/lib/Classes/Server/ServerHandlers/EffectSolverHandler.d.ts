import GameServer from '../GameServer';
import ServerHandler from '../ServerHandler';
export default class EffectSolverHandler extends ServerHandler {
    constructor(gameServer: GameServer);
    registerNetworkHandlers(playerSockets: any): void;
    unregisterNetworkHandlers(playerSockets: any): void;
    protected onQueueActivateAbility: (playerSocket: any, data: any) => void;
    onQueueUpgradeCard: (playerSocket: any, data: any) => void;
    protected onReturnTargets: (playerSocket: any, data: any) => void;
    protected onCardBlocking: (playerSocket: any, data: any) => void;
    protected onReorderBlockingCard: (playerSocket: any, data: any) => void;
    protected onStopCardBlocking: (playerSocket: any, data: any) => void;
    protected onCardMovedRow: (playerSocket: any, data: any) => void;
    protected onQueueFightCreature: (playerSocket: any, data: any) => void;
    protected onPlayerFinishedAddedingToQueue(playerSocket: any, data: any): void;
    protected onPlayerExploredLand(playerSocket: any, data: any): void;
    protected onQueuePlayCard(playerSocket: any, data: any): void;
    protected onCancelAction(playerSocket: any, data: any): void;
}
