import { ClientMessage } from '../../MessageBase';
import PayResourceCost from '../../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../../Target/TargetInfo';
export default class QueuePlayCardMessage extends ClientMessage {
    cardInstanceId: number;
    destinationZoneZoneEnum: number;
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    constructor(messageId: string, senderUserId: string, cardInstanceId: number, destinationZoneZoneEnum: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[]);
    toJSON(): any;
    static fromJSON(json: any): QueuePlayCardMessage;
    validate(): boolean;
}
