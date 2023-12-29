import ServerQueueline from '../ServerQueueline';
import GameServer from '../../../Server/GameServer';
declare class MoveRowQueueLine extends ServerQueueline {
    originZoneZoneEnum: number;
    destinationZoneZoneEnum: number;
    constructor(clientMessageId: string, movingCardInstanceId: number, sourcePlayerUserId: string, priority: number, originZoneZoneEnum: number, destinationZoneZoneEnum: number);
    sendEffectToDoEffect(server: GameServer, queuePosition: number): void;
}
export default MoveRowQueueLine;
