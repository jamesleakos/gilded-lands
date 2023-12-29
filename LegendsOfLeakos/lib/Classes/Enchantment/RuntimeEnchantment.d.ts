import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../Card/RuntimeCard';
import PlayerInfo from '../Player/PlayerInfo';
import RuntimeKeyword from '../Keyword/RuntimeKeyword/RuntimeKeyword';
import RuntimeAbility from '../Ability/RuntimeAbility';
import RuntimeZone from '../Zone/RuntimeZone';
declare class RuntimeEnchantment extends AbilityKeywordRuntimeEntity {
    libraryID: number;
    creatingEntityInstanceId: number;
    residingCardInstanceId: number | null;
    imageName: string;
    constructor(name: string, imageName: string, libraryID: number, instanceId: number, creatingEntityInstanceId: number, creatingPlayerUserId: string, runtimeKeywords: RuntimeKeyword[], abilities: RuntimeAbility[], residingZoneInstanceId: number, residingCardInstanceId?: number | null);
    toJSON(): any;
    static fromRuntimeJSON(json: any): RuntimeEnchantment;
    static fromLibraryJSON(json: any, creatingEntity: AbilityKeywordRuntimeEntity, ownerPlayer: PlayerInfo, residingZone: RuntimeZone, residingCard?: RuntimeCard | null): RuntimeEnchantment;
}
export default RuntimeEnchantment;
