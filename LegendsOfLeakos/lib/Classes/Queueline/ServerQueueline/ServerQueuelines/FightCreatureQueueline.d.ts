import ServerQueueline from '../ServerQueueline';
import GameServer from '../../../Server/GameServer';
declare class FightCreatureQueueLine extends ServerQueueline {
    attackedCardInstanceId: number;
    constructor(clientMessageId: string, attackingCardInstanceId: number, attackedCardInstanceId: number, sourcePlayerUserId: string, priority: number);
    sendEffectToDoEffect(server: GameServer, queuePosition: number): void;
}
export default FightCreatureQueueLine;
