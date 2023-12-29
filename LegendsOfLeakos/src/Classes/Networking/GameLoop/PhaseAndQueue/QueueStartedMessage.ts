import { ServerMessage } from '../../MessageBase';
import { NetworkProtocol } from '../../../../Enums/NetworkProtocol';

export default class QueueStartedMessage extends ServerMessage {
  public totalQueuelines: number;
  public queuelinesThisMessage: number;
  public breakBeforeEndOfQueue: boolean;
  public breakingPlayerUserId: string;
  public attackingCardInstanceIds: number[];
  public blocks: {
    blockingCardInstanceId: number;
    blockedCardInstanceId: number;
    blockOrder: number;
  }[];

  constructor(
    recipientUserId: string,
    totalQueuelines: number,
    queuelinesThisMessage: number,
    breakBeforeEndOfQueue: boolean,
    breakingPlayerUserId: string,
    attackingCardInstanceIds: number[],
    blocks: {
      blockingCardInstanceId: number;
      blockedCardInstanceId: number;
      blockOrder: number;
    }[]
  ) {
    super(recipientUserId);
    this.messageEnum = NetworkProtocol.QueueStarted;
    this.totalQueuelines = totalQueuelines;
    this.queuelinesThisMessage = queuelinesThisMessage;
    this.breakBeforeEndOfQueue = breakBeforeEndOfQueue;
    this.breakingPlayerUserId = breakingPlayerUserId;
    this.attackingCardInstanceIds = attackingCardInstanceIds;
    this.blocks = blocks;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      totalQueuelines: this.totalQueuelines,
      queuelinesThisMessage: this.queuelinesThisMessage,
      breakBeforeEndOfQueue: this.breakBeforeEndOfQueue,
      breakingPlayerUserId: this.breakingPlayerUserId,
      attackingCardInstanceIds: this.attackingCardInstanceIds,
      blocks: this.blocks.map((b) => ({ ...b })),
    };
  }

  static fromJSON(json: any): QueueStartedMessage {
    return new QueueStartedMessage(
      json.recipientUserId,
      json.totalQueuelines,
      json.queuelinesThisMessage,
      json.breakBeforeEndOfQueue,
      json.breakingPlayerUserId,
      json.attackingCardInstanceIds,
      json.blocks.map((b: any) => ({ ...b }))
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      this.recipientUserId != null &&
      this.totalQueuelines != null &&
      this.queuelinesThisMessage != null &&
      this.breakBeforeEndOfQueue != null &&
      // this.breakingPlayerUserId != null && // this can be NULL
      this.attackingCardInstanceIds != null &&
      this.blocks != null
    );
  }
}
