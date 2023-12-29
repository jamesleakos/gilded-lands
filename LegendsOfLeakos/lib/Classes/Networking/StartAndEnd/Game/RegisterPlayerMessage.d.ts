import RuntimeLandTile from '../../../RealmsAndLand/LandTile/RuntimeLandTile';
import RuntimeRealm from '../../../RealmsAndLand/Realm/RuntimeRealm';
import { ClientMessage } from '../../MessageBase';
export default class RegisterPlayerMessage extends ClientMessage {
    name: string;
    isHuman: boolean;
    realm: RuntimeRealm;
    landtiles: RuntimeLandTile[];
    constructor(senderUserId: string, name: string, isHuman: boolean, realm: RuntimeRealm, landtiles: RuntimeLandTile[]);
    toJSON(): any;
    static fromJSON(json: any): RegisterPlayerMessage;
    validate(): boolean;
}
