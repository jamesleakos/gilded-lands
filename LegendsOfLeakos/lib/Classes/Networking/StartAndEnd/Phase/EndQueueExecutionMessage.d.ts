import { ServerMessage } from '../../MessageBase';
export default class EndQueueExecutionMessage extends ServerMessage {
    constructor(recipientUserId: string);
    toJSON(): any;
    static fromJSON(json: any): EndQueueExecutionMessage;
    validate(): boolean;
}
