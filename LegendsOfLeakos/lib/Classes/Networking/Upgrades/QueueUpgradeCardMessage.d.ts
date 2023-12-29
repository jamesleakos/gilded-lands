import { ClientMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
export default class QueueUpgradeCardMessage extends ClientMessage {
    cardInstanceId: number;
    upgradeIndex: number;
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    actionPriority: number;
    constructor(messageId: string, senderUserId: string, cardInstanceId: number, upgradeIndex: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[], actionPriority: number);
    toJSON(): any;
    static fromJSON(json: any): QueueUpgradeCardMessage;
    validate(): boolean;
}
