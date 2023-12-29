import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
declare abstract class DeckRequirement {
    type: DeckReqType;
    reqValues: Map<DeckReqVariable, number>;
    abstract canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean;
    abstract isRequirementMet(myBiome: LibraryBiome, libraryCardID: number): boolean;
    abstract requirementToText(gameProperties: any): string;
    abstract myRequiredValues(): DeckReqVariable[];
    toJSON(): any;
    private static fromJSONMethods;
    static registerRequirement(type: DeckReqType, fromJSONMethod: (json: any) => DeckRequirement): void;
    static fromJSON(json: any): DeckRequirement;
    static isLibraryJSONValid(json: any): boolean;
}
export default DeckRequirement;
