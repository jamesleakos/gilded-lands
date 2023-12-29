import { ClientMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
export default class QueueActivateAbilityMessage extends ClientMessage {
    sourceEntityInstanceId: number;
    abilityIndex: number;
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    constructor(messageId: string, senderUserId: string, sourceEntityInstanceId: number, abilityIndex: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[]);
    toJSON(): any;
    static fromJSON(json: any): QueueActivateAbilityMessage;
    validate(): boolean;
}
