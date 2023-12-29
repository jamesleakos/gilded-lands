import DeckRequirement from './DeckRequirement';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import LibraryLandTile from '../RealmsAndLand/LandTile/LibraryLandTile';
import { BiomeType } from '../../Enums/LandAndBiome';

class LandAmountDeckRequirement extends DeckRequirement {
  constructor(biomeType: number, amount: number) {
    super();
    this.type = DeckReqType.LandAmount;
    this.reqValues.set(DeckReqVariable.BiomeType, biomeType);
    this.reqValues.set(DeckReqVariable.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariable[] {
    return [DeckReqVariable.Amount, DeckReqVariable.BiomeType];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.isRequirementMet(myBiome, myCard.libraryId);
  }

  isRequirementMet(biome: LibraryBiome, myCardLibraryId: number): boolean {
    let landTiles: LibraryLandTile[] = biome.landTiles.filter(
      (c: LibraryLandTile) =>
        c.landType === this.reqValues.get(DeckReqVariable.BiomeType)
    );
    if (landTiles !== undefined) {
      return landTiles.length >= this.reqValues.get(DeckReqVariable.Amount);
    }

    return false;
  }

  requirementToText(): string {
    return (
      this.reqValues.get(DeckReqVariable.Amount) +
      ' of ' +
      (this.reqValues.get(DeckReqVariable.BiomeType) as BiomeType)
    );
  }

  static override fromJSON(json: any): DeckRequirement {
    let amount = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.Amount
    ).value;
    let biomeType = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.BiomeType
    ).value;

    if (!biomeType || !amount) throw new Error('Missing value in json');
    return new LandAmountDeckRequirement(biomeType, amount);
  }
}

DeckRequirement.registerRequirement(
  DeckReqType.CardAmount,
  LandAmountDeckRequirement.fromJSON
);

export default LandAmountDeckRequirement;
