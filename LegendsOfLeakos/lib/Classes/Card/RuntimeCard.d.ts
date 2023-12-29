import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import RuntimeEffect from '../Effect/RuntimeEffect';
import Stat from '../Stat/Stat';
import RuntimeEnchantment from '../Enchantment/RuntimeEnchantment';
import TargetInfo from '../Target/TargetInfo';
import GameState from '../Game/GameState';
import RuntimeKeyword from '../Keyword/RuntimeKeyword/RuntimeKeyword';
import RuntimeAbility from '../Ability/RuntimeAbility';
import RuntimeZone from '../Zone/RuntimeZone';
import PlayerInfo from '../Player/PlayerInfo';
import LibraryCard from './LibraryCard';
declare class RuntimeCard extends AbilityKeywordRuntimeEntity {
    libraryId: number;
    upgradesApplied: number[];
    attack: Stat;
    health: Stat;
    priority: Stat;
    getStatList: () => Stat[];
    enchantments: RuntimeEnchantment[];
    constructor(name: string, instanceId: number, ownerPlayerUserId: string, residingZoneInstanceId: number, keywords: RuntimeKeyword[], abilities: RuntimeAbility[], libraryId: number, upgradesApplied: number[], attack: Stat, health: Stat, priority: Stat, enchantments: RuntimeEnchantment[]);
    isPlayable: (gameState: GameState) => boolean;
    getLibraryCard(gameState: GameState): LibraryCard;
    preResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    toJSON(): any;
    static fromRuntimeJSON(json: any): RuntimeCard;
    static cardFromLibraryJSON: (json: any, zone: RuntimeZone, ownerPlayer: PlayerInfo) => RuntimeCard;
    static cardsFromLibraryCardEntry: (json: any, zone: RuntimeZone, ownerPlayer: PlayerInfo, cardLibrary: LibraryCard[]) => RuntimeCard[];
}
export default RuntimeCard;
