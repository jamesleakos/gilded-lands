import DeckRequirement from './DeckRequirement';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import GameManager from '../Game/GameManager';
import { BiomeDepth, BiomeType } from '../../Enums/LandAndBiome';

class FullLandDepthPerCardRequirement extends DeckRequirement {
  constructor(
    biomeType: number,
    biomeDepth: number,
    perCardAmount: number,
    amount: number
  ) {
    super();
    this.type = DeckReqType.FullLandDepthPerCard;
    this.reqValues.set(DeckReqVariable.BiomeType, biomeType);
    this.reqValues.set(DeckReqVariable.BiomeDepth, biomeDepth);
    this.reqValues.set(DeckReqVariable.PerCardAmount, perCardAmount);
    this.reqValues.set(DeckReqVariable.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariable[] {
    return [
      DeckReqVariable.BiomeType,
      DeckReqVariable.BiomeDepth,
      DeckReqVariable.PerCardAmount,
      DeckReqVariable.Amount,
    ];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.wouldRequirementBeMetAtSomeNumberOfMyCard(
      myBiome,
      myBiome.getCardsCountByLibraryID(myCard.libraryId) + 1
    );
  }

  override isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean {
    return this.wouldRequirementBeMetAtSomeNumberOfMyCard(
      myBiome,
      myBiome.getCardsCountByLibraryID(libraryCardID)
    );
  }

  private wouldRequirementBeMetAtSomeNumberOfMyCard(
    myBiome: LibraryBiome,
    numberOfMyCard: number
  ): boolean {
    if (myBiome.biomeType !== this.reqValues.get(DeckReqVariable.BiomeType))
      return false;

    let testingEntry: LibraryBiome;
    if (
      (this.reqValues.get(DeckReqVariable.BiomeDepth) as BiomeDepth) ===
      BiomeDepth.all
    ) {
      testingEntry = myBiome;
    } else {
      let subEntry = myBiome.subBiomes.find(
        (sb) => sb.biomeDepth === this.reqValues.get(DeckReqVariable.BiomeDepth)
      );
      if (subEntry === undefined) return false;

      testingEntry = subEntry;
    }

    if (
      (testingEntry.landTiles.length /
        this.reqValues.get(DeckReqVariable.Amount)) *
        this.reqValues.get(DeckReqVariable.PerCardAmount) <
      numberOfMyCard
    )
      return false;

    return true;
  }

  override requirementToText(gameManager: GameManager): string {
    return (
      this.reqValues.get(DeckReqVariable.Amount) +
      ' of ' +
      (this.reqValues.get(DeckReqVariable.BiomeDepth) as BiomeDepth) +
      ' ' +
      (this.reqValues.get(DeckReqVariable.BiomeType) as BiomeType) +
      ' per ' +
      this.reqValues.get(DeckReqVariable.PerCardAmount)
    );
  }

  static override fromJSON(json: any): DeckRequirement {
    let amount = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.Amount
    ).value;
    let biomeType = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.BiomeType
    ).value;
    let biomeDepth = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.BiomeDepth
    ).value;
    let perCardAmount = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.PerCardAmount
    ).value;
    if (!biomeType || !biomeDepth || !perCardAmount || !amount)
      throw new Error('Missing value in json');
    return new FullLandDepthPerCardRequirement(
      biomeType,
      biomeDepth,
      perCardAmount,
      amount
    );
  }
}

DeckRequirement.registerRequirement(
  DeckReqType.CardAmount,
  FullLandDepthPerCardRequirement.fromJSON
);

export default FullLandDepthPerCardRequirement;
