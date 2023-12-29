import { ServerMessage } from '../../MessageBase';
import RuntimeCard from '../../../Card/RuntimeCard';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
export default class CardPlayedMessage extends ServerMessage {
    sourcePlayerUserId: string;
    card: RuntimeCard;
    originZoneZoneEnum: number;
    destinationZoneZoneEnum: number;
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    queuePosition: number;
    info: string;
    constructor(recipientUserId: string, sourcePlayerUserId: string, card: RuntimeCard, originZoneZoneEnum: number, destinationZoneZoneEnum: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[], queuePosition: number, info: string);
    toJSON(): any;
    static fromJSON(json: any): CardPlayedMessage;
    validate(): boolean;
}
