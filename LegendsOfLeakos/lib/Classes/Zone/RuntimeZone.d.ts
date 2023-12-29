import { ZoneEnum } from '../../Enums/Zone';
import RuntimeCard from '../Card/RuntimeCard';
import RuntimeEnchantment from '../Enchantment/RuntimeEnchantment';
import TargetableRuntimeEntity from '../Entity/TargetableRuntimeEntity';
import RuntimeEffect from '../Effect/RuntimeEffect';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
import { LibraryZone } from './LibraryZone';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
declare class RuntimeZone extends TargetableRuntimeEntity {
    zoneEnum: ZoneEnum;
    cards: RuntimeCard[];
    enchantments: RuntimeEnchantment[];
    constructor(instanceId: number, name: string, zoneEnum: ZoneEnum, ownerPlayerUserId: string, cards: RuntimeCard[], enchantments: RuntimeEnchantment[]);
    preResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    addCard(card: RuntimeCard): void;
    addCardCreatedByEffect(card: RuntimeCard): void;
    removeCard(card: RuntimeCard): void;
    getLibraryZone(): LibraryZone;
    clone: () => RuntimeZone;
    toJSONFromRuntimeCopyAllCards(): any;
    toJSONForPlayer(): any;
    toJSONForOpponent(): any;
    static fromRuntimeJSON(json: any): RuntimeZone;
    static fromLibraryJSON(json: any): RuntimeZone;
}
export default RuntimeZone;
