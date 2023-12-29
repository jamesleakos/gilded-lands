import { ServerMessage } from '../../MessageBase';
import RuntimeCard from '../../../Card/RuntimeCard';
/**
 * This message is used by the server to move cards that the player did not request to be moved.
 * ex. moving cards to the battle row on attack.
 * The cards do not need to start as visible to either player for this to work
 */
export default class ServerMovedCardMessage extends ServerMessage {
    ownerPlayerUserId: string;
    card: RuntimeCard;
    originZoneZoneEnum: number;
    destinationZoneZoneEnum: number;
    constructor(recipientUserId: string, ownerPlayerUserId: string, card: RuntimeCard, originZoneZoneEnum: number, destinationZoneZoneEnum: number);
    toJSON(): any;
    static fromJSON(json: any): ServerMovedCardMessage;
    validate(): boolean;
}
