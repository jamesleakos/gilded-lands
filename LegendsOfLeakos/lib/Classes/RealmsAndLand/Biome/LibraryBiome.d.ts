import LibraryCardEntry from './LibraryCardEntry';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import LibraryCard from '../../Card/LibraryCard';
import { BiomeAddCardEnum } from '../../../Enums/LandAndBiome';
import GameManager from '../../Game/GameManager';
declare class BiomeAddCardMessage {
    result: BiomeAddCardEnum;
    numberAdded: number;
    message: string;
    constructor(result: BiomeAddCardEnum, numberAdded: number, message: string);
}
declare class BiomeValidMessage {
    isValid: boolean;
    message: string;
    constructor(isValid: boolean, message: string);
}
declare class LibraryBiome {
    name: string;
    biomeType: number;
    biomeDepth: number;
    cards: LibraryCardEntry[];
    landTiles: LibraryLandTile[];
    subBiomes: LibraryBiome[];
    getLandTiles(): LibraryLandTile[];
    wouldRemovingThisCardCauseErrors(card: LibraryCard, gameManager: GameManager): BiomeValidMessage;
    areBiomeAndSubsValid(gameManager: GameManager, message?: BiomeValidMessage): BiomeValidMessage;
    private cardsCanBeAddedToBiomeOrSubbiome;
    private cardsCanBeAddedToThisBiome;
    getCardsCount(): number;
    getCardsCountByLibraryID(libraryId: number): number;
    getCardsCountByCardType(config: any, cardTypeId: number): number;
    getAllCardsInBiomeAndSubbiomes(): LibraryCardEntry[];
    addCardsToBiomeOrSubbiome(card: LibraryCard, amount: number, gameManager: GameManager): BiomeAddCardMessage;
    private addCard;
    deleteAllCards(): void;
    removeSingleCardFromBiomeOrSubbiome(card: LibraryCard): boolean;
    removeCards(card: any): void;
    removeSingleCard(card: any): boolean;
    toJSON(): any;
    static fromJSON(json: any): LibraryBiome;
    static copyBiome(oldBiome: LibraryBiome): LibraryBiome;
    static copyAllCardsBetweenBiomes(oldBiome: LibraryBiome, newBiome: LibraryBiome): void;
}
export default LibraryBiome;
