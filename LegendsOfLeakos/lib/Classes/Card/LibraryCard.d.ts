import LibraryKeyword from '../Keyword/LibraryKeyword/LibraryKeyword';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import CardUpgrade from './CardUpgrade';
import DeckRequirement from '../DeckRequirement/DeckRequirement';
import { BiomeType, BiomeDepth } from '../../Enums/LandAndBiome';
import LibraryAbility from '../Ability/LibraryAbility';
declare class LibraryCard {
    libraryId: number;
    cardTypeId: number;
    name: String;
    biomeType: BiomeType;
    biomeDepth: BiomeDepth;
    cardText: String;
    imageName: String;
    attack: number;
    health: number;
    priority: number;
    costs: PayResourceCost[];
    deckRequirements: DeckRequirement[];
    keywords: LibraryKeyword[];
    abilities: LibraryAbility[];
    cardUpgrades: CardUpgrade[];
    getCardUpgradeByUpgradeIndex(index: number): any;
    clone(): LibraryCard;
    toJSON(): any;
    static fromJSON(json: any): LibraryCard;
    static isLibraryJSONValid(json: any): boolean;
}
export default LibraryCard;
