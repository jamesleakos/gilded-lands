import { ServerMessage } from '../MessageBase';
export default class QueueStartedMessage extends ServerMessage {
    totalQueuelines: number;
    queuelinesThisMessage: number;
    breakBeforeEndOfQueue: boolean;
    breakingPlayer: number;
    blockingCards: number[];
    blockedCards: number[];
    blockingOrder: number[];
    constructor(recipientUserId: string, totalQueuelines: number, queuelinesThisMessage: number, breakBeforeEndOfQueue: boolean, breakingPlayer: number, blockingCards: number[], blockedCards: number[], blockingOrder: number[]);
    toJSON(): any;
    static fromJSON(json: any): QueueStartedMessage;
    validate(): boolean;
}
