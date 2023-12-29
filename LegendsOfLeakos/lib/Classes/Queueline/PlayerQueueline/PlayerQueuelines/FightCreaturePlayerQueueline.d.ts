import PlayerQueueline from '../PlayerQueueline';
import GameState from '../../../Game/GameState';
import Player from '../../../Player/Player';
export default class FightCreaturePlayerQueueLine extends PlayerQueueline {
    attackedCardInstanceId: number;
    constructor(myPlayerUserId: string, attackingCardInstanceId: number, attackedCardInstanceId: number, sourcePlayerUserId: string, queuePosition: number);
    sendEffectToPlayer(gameState: GameState, myPlayer: Player): void;
    actionToString(gameState: GameState): string;
    clone(): PlayerQueueline;
}
