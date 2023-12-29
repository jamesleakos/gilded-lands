import Stat from '../Stat/Stat';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeCard from '../Card/RuntimeCard';
import { ZoneEnum } from '../../Enums/Zone';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeRealm from '../RealmsAndLand/Realm/RuntimeRealm';
declare class PlayerInfo {
    userId: string;
    id: number;
    name: string;
    isConnected: boolean;
    isHuman: boolean;
    stats: Stat[];
    nameToStat: Map<string, Stat>;
    idToStat: Map<number, Stat>;
    zones: RuntimeZone[];
    realm: RuntimeRealm;
    /**
     * Each time an entity is created, it is given a unique instanceId. This is used to identify the entity.
     * It should thus be incremented each time an entity is created.
     */
    currentEntityInstanceId: number;
    readyForQueue: boolean;
    clone(): PlayerInfo;
    getCardFromInstanceId(cardInstanceId: number): RuntimeCard | null;
    getAllFriendlyCardsInPlay(): Array<RuntimeCard>;
    getFriendlyZoneContainingCard(cardInstanceId: number): RuntimeZone;
    getZoneFromInstanceId(zoneInstanceId: number): RuntimeZone;
    getFriendlyZoneFromZoneEnum(zoneEnum: ZoneEnum): RuntimeZone | undefined;
    setPlayerManaFromLand(): void;
    payResourceCosts(costs: Array<PayResourceCost>, goalManaSpend?: Array<PayResourceCost> | null): Array<PayResourceCost> | null;
    private _payResourceCost;
    canPayResourceCosts(costs: Array<PayResourceCost>): boolean;
    /**
     * This is a complete copy of the player's state, to send to the player themselves.
     * It includes cards in zones that should be visible to them and not the opponent (hand)
     */
    toJSONForPlayer(): any;
    /**
     * This is a complete copy of the player's state, to send to the opponent.
     * It does not include cards in zones that should be hidden from the opponent (hand)
     */
    toJSONForOpponent(): any;
    /**
     * for use once the game is going - it's unclear to me, if this needs to be parsed away
     * if this will work because of the circular references inherant in giving the gameState
     */
    static fromRuntimeJSON(json: any): PlayerInfo;
}
export default PlayerInfo;
