import DeckRequirement from './DeckRequirement';
import { DeckReqVariable } from '../../Enums/DeckRequirements';
import GameManager from '../Game/GameManager';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
declare class DepthAmountDeckRequirement extends DeckRequirement {
    constructor(biomeDepth: number, amount: number);
    myRequiredValues(): DeckReqVariable[];
    canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    requirementToText(gameManager: GameManager): string;
    static fromJSON(json: any): DeckRequirement;
}
export default DepthAmountDeckRequirement;
