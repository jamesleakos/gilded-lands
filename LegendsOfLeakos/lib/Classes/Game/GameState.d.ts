import GameManager from './GameManager';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeZone from '../Zone/RuntimeZone';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';
declare class GameState {
    gameManager: GameManager;
    players: PlayerInfo[];
    currentTurn: number;
    currentPhaseIndex: number;
    rngSeed: number;
    blocks: {
        blockingCardInstanceId: number;
        blockedCardInstanceId: number;
        blockOrder: number;
    }[];
    constructor(gameManager: GameManager, players: PlayerInfo[], currentTurn: number, currentPhaseIndex: number, rngSeed: number, blocks: {
        blockingCardInstanceId: number;
        blockedCardInstanceId: number;
        blockOrder: number;
    }[]);
    clone(): GameState;
    cardBlocking(blockingCardInstanceId: number, blockedCardInstanceId: number, blockOrder: number): void;
    reorderBlockingCard(blockingCardInstanceId: number, newBlockOrder: number): void;
    stopCardBlocking(blockingCardInstanceId: number): void;
    getCardFromAnywhere(cardInstanceId: number): RuntimeCard | null;
    getZoneByInstanceId(zoneInstanceId: number): RuntimeZone | null;
    getZoneByZoneEnumAndUserId(zoneEnum: number, userId: string): RuntimeZone | null;
    getEntityFromAnywhere(instanceId: number): TargetableRuntimeEntity | null;
    getPlayerInfoByUserId(userId: string): PlayerInfo | null;
}
export default GameState;
