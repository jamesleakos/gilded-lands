import { ClientMessage } from '../MessageBase';
import TargetInfo from '../../Target/TargetInfo';
export default class ReturnTargetsToServerMessage extends ClientMessage {
    targetInfo: TargetInfo[];
    targetInfoCode: number;
    constructor(messageId: string, senderUserId: string, targetInfo: TargetInfo[], targetInfoCode: number);
    toJSON(): any;
    static fromJSON(json: any): ReturnTargetsToServerMessage;
    validate(): boolean;
}
