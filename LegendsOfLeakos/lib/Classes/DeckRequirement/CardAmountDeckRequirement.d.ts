import DeckRequirement from './DeckRequirement';
import { DeckReqVariable } from '../../Enums/DeckRequirements';
import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import GameManager from '../Game/GameManager';
declare class CardAmountDeckRequirement extends DeckRequirement {
    constructor(libraryId: number, amount: number);
    myRequiredValues(): DeckReqVariable[];
    canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    requirementToText(gameManager: GameManager): string;
    static fromJSON(json: any): CardAmountDeckRequirement;
}
export default CardAmountDeckRequirement;
