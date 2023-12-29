import TargetsCostsQueueline from '../TargetsCostsQueueline';
import GameServer from '../../../../../Server/GameServer';
import TargetInfo from '../../../../../Target/TargetInfo';
import PayResourceCost from '../../../../../PayResourceCost/PayResourceCost';
import { ZoneEnum } from '../../../../../../Enums/Zone';
declare class PlayCardQueueLine extends TargetsCostsQueueline {
    originZoneZoneEnum: ZoneEnum;
    destinationZoneZoneEnum: ZoneEnum;
    constructor(clientMessageId: string, sourceCardInstanceId: number, sourcePlayerUserId: string, targetInfoList: TargetInfo[], paidCosts: PayResourceCost[], priority: number, originZoneZoneEnum: ZoneEnum, destinationZoneZoneEnum: ZoneEnum);
    sendEffectToDoEffect(server: GameServer, queuePosition: number): void;
}
export default PlayCardQueueLine;
