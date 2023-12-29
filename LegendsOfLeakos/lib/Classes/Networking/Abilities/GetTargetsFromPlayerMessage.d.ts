import { ServerMessage } from '../MessageBase';
import RuntimeEffect from '../../Effect/RuntimeEffect';
import TargetCriteria from '../../Target/TargetCriteria';
export default class GetTargetsFromPlayerMessage extends ServerMessage {
    effect: RuntimeEffect;
    cardInstanceId: number;
    targetCriterias: TargetCriteria[];
    targetInfoCode: number;
    queueOrder: number;
    constructor(recipientUserId: string, effect: RuntimeEffect, currentCardInstanceId: number, targetCriterias: TargetCriteria[], targetInfoCode: number, queueOrder: number);
    toJSON(): any;
    static fromJSON(json: any): GetTargetsFromPlayerMessage;
    validate(): boolean;
}
