import DeckRequirement from './DeckRequirement';
import { DeckReqVariable } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import GameManager from '../Game/GameManager';
declare class FullLandDepthPerCardRequirement extends DeckRequirement {
    constructor(biomeType: number, biomeDepth: number, perCardAmount: number, amount: number);
    myRequiredValues(): DeckReqVariable[];
    canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    private wouldRequirementBeMetAtSomeNumberOfMyCard;
    requirementToText(gameManager: GameManager): string;
    static fromJSON(json: any): DeckRequirement;
}
export default FullLandDepthPerCardRequirement;
