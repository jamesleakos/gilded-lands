import Queueline from '../Queueline';
import GameServer from '../../Server/GameServer';
import RuntimeCard from '../../Card/RuntimeCard';
import PlayerInfo from '../../Player/PlayerInfo';
declare class FightCreatureQueueLine extends Queueline {
    attackedCard: RuntimeCard;
    constructor(server: GameServer, attackingCard: RuntimeCard, attackedCard: RuntimeCard, sourcePlayer: PlayerInfo, priority: number);
    sendEffectToDoEffect(queuePosition: number): void;
}
export default FightCreatureQueueLine;
