import RuntimeEffect from '../../../Effect/RuntimeEffect';
import GameState from '../../../Game/GameState';
import Player from '../../../Player/Player';
import PlayerQueueline from '../PlayerQueueline';
declare class ServerRequestsTargetsPlayerQueueline extends PlayerQueueline {
    effect: RuntimeEffect;
    targetInfoCode: number;
    constructor(myPlayerUserId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, queuePosition: number, effect: RuntimeEffect, targetInfoCode: number);
    sendEffectToPlayer(gameState: GameState, myPlayer: Player): void;
    actionToString(gameState: GameState): string;
    clone(): ServerRequestsTargetsPlayerQueueline;
}
export default ServerRequestsTargetsPlayerQueueline;
