import GameServer from '../../Server/GameServer';
declare abstract class ServerQueueline {
    clientMessageId: string;
    sourceCardInstanceId: number;
    sourcePlayerUserId: string;
    priority: number;
    fillBaseInfo(clientMessageId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, priority: number): void;
    abstract sendEffectToDoEffect(server: GameServer, queuePosition: number): void;
    areTargetsStillAvailable(server: GameServer): boolean;
    areTargetsStillRequired(server: GameServer): boolean;
    areAllSelectedTargetInfoItemsValid(server: GameServer): boolean;
    goOutForTargets(server: GameServer, queuePosition: number): void;
}
export default ServerQueueline;
