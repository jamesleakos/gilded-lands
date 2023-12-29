import GameServer from '../Server/GameServer';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
declare abstract class Queueline {
    server: GameServer;
    sourceCard: RuntimeCard;
    sourcePlayer: PlayerInfo;
    priority: number;
    fillBaseInfo(server: GameServer, sourceCard: RuntimeCard, sourcePlayer: PlayerInfo, priority: number): void;
    abstract sendEffectToDoEffect(queuePosition: number): void;
    areTargetsStillAvailable(): boolean;
    areTargetsStillRequired(): boolean;
    areAllSelectedTargetInfoItemsValid(): boolean;
    goOutForTargets(): void;
}
export default Queueline;
