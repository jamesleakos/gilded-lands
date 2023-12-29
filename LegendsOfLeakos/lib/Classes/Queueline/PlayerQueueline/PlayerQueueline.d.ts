import GameState from '../../Game/GameState';
import Player from '../../Player/Player';
export default abstract class PlayerQueueline {
    myPlayerUserId: string;
    sourceCardInstanceId: number;
    sourcePlayerUserId: string;
    queuePosition: number;
    fillBaseInfo(myPlayerUserId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, queuePosition: number): void;
    abstract sendEffectToPlayer(gameState: GameState, myPlayer: Player): void;
    abstract actionToString(gameState: GameState): string;
    abstract clone(): PlayerQueueline;
}
