import { ServerMessage } from '../../MessageBase';
export default class QueueStartedMessage extends ServerMessage {
    totalQueuelines: number;
    queuelinesThisMessage: number;
    breakBeforeEndOfQueue: boolean;
    breakingPlayerUserId: string;
    attackingCardInstanceIds: number[];
    blocks: {
        blockingCardInstanceId: number;
        blockedCardInstanceId: number;
        blockOrder: number;
    }[];
    constructor(recipientUserId: string, totalQueuelines: number, queuelinesThisMessage: number, breakBeforeEndOfQueue: boolean, breakingPlayerUserId: string, attackingCardInstanceIds: number[], blocks: {
        blockingCardInstanceId: number;
        blockedCardInstanceId: number;
        blockOrder: number;
    }[]);
    toJSON(): any;
    static fromJSON(json: any): QueueStartedMessage;
    validate(): boolean;
}
