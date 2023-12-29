import { ServerMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
export default class AbilityActivatedMessage extends ServerMessage {
    playerUsingAbilityUserId: string;
    entityUsingAbilityInstanceId: number;
    abilityIndex: number;
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    queuePosition: number;
    constructor(recipientUserId: string, playerUsingAbilityUserId: string, entityUsingAbilityInstanceId: number, abilityIndex: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[], queuePosition: number);
    toJSON(): any;
    static fromJSON(json: any): AbilityActivatedMessage;
    validate(): boolean;
}
