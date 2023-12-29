import { ClientMessage } from '../MessageBase';
import TargetInfo from '../../Target/TargetInfo';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';

export default class ReturnTargetsToServerMessage extends ClientMessage {
  public targetInfo: TargetInfo[];
  public targetInfoCode: number;

  constructor(
    messageId: string,
    senderUserId: string,
    targetInfo: TargetInfo[],
    targetInfoCode: number
  ) {
    super(messageId, senderUserId);
    this.messageEnum = NetworkProtocol.ReturnTargetsToServer;
    this.targetInfo = targetInfo;
    this.targetInfoCode = targetInfoCode;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      targetInfo: this.targetInfo.map((info) => info.toJSON()),
      targetInfoCode: this.targetInfoCode,
    };
  }

  static fromJSON(json: any): ReturnTargetsToServerMessage {
    return new ReturnTargetsToServerMessage(
      json.messageId,
      json.senderUserId,
      json.targetInfo.map(TargetInfo.fromJSON),
      json.targetInfoCode
    );
  }

  // check that all fields in the message are valid
  validate(): boolean {
    return (
      super.validate() && this.targetInfo != null && this.targetInfoCode != null
    );
  }
}
