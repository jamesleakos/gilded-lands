import { NetworkProtocol } from '../../Enums/NetworkProtocol';
declare abstract class MessageBase {
    messageEnum: NetworkProtocol;
    abstract toJSON(): any;
    abstract validate(): boolean;
}
declare abstract class ServerMessage extends MessageBase {
    recipientUserId: string;
    constructor(recipientUserId: string);
    toJSON(): {
        messageEnum: string;
        recipientUserId: string;
    };
    validate(): boolean;
}
declare abstract class ClientMessage extends MessageBase {
    messageId: string;
    senderUserId: string;
    constructor(messageId: string, senderUserId: string);
    toJSON(): {
        messageId: string;
        senderUserId: string;
    };
    validate(): boolean;
    clone(): ClientMessage;
    static generateUniqueId(): string;
}
export { ServerMessage, ClientMessage, MessageBase };
