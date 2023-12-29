import { ServerMessage } from '../MessageBase';
import PayResourceCost from '../../PayResourceCost/PayResourceCost';
import TargetInfo from '../../Target/TargetInfo';
export default class CardUpgradedMessage extends ServerMessage {
    playerUserId: string;
    cardInstanceId: number;
    upgradeLevel: number;
    paidCosts: PayResourceCost[];
    targetInfoList: TargetInfo[];
    useEffect: boolean;
    queuePosition: number;
    constructor(recipientUserId: string, playerUserId: string, cardInstanceId: number, upgradeLevel: number, paidCosts: PayResourceCost[], targetInfoList: TargetInfo[], useEffect: boolean, queuePosition: number);
    toJSON(): any;
    static fromJSON(json: any): CardUpgradedMessage;
    validate(): boolean;
}
