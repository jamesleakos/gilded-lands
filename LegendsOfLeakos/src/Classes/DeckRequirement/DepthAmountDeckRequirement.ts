import DeckRequirement from './DeckRequirement';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
import GameManager from '../Game/GameManager';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import LibraryLandTile from '../RealmsAndLand/LandTile/LibraryLandTile';
import { BiomeDepth } from '../../Enums/LandAndBiome';

class DepthAmountDeckRequirement extends DeckRequirement {
  constructor(biomeDepth: number, amount: number) {
    super();
    this.type = DeckReqType.DepthAmount;
    this.reqValues.set(DeckReqVariable.BiomeDepth, biomeDepth);
    this.reqValues.set(DeckReqVariable.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariable[] {
    return [DeckReqVariable.BiomeDepth, DeckReqVariable.Amount];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.isRequirementMet(myBiome, myCard.libraryId);
  }

  override isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean {
    let counter = 0;
    let landTiles: LibraryLandTile[] = myBiome.landTiles.filter(
      (lt: LibraryLandTile) =>
        lt.depth === this.reqValues.get(DeckReqVariable.BiomeDepth)
    );
    if (landTiles !== undefined) {
      counter += landTiles.length;
    }

    return counter >= this.reqValues.get(DeckReqVariable.Amount);
  }

  override requirementToText(gameManager: GameManager): string {
    return (
      this.reqValues.get(DeckReqVariable.Amount) +
      ' of ' +
      (this.reqValues.get(DeckReqVariable.BiomeDepth) as BiomeDepth)
    );
  }

  static override fromJSON(json: any): DeckRequirement {
    let amount = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.Amount
    ).value;
    let biomeDepth = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.BiomeDepth
    ).value;

    if (!biomeDepth || !amount) {
      throw new Error('JSON parsing error');
    }
    return new DepthAmountDeckRequirement(biomeDepth, amount);
  }
}

DeckRequirement.registerRequirement(
  DeckReqType.CardAmount,
  DepthAmountDeckRequirement.fromJSON
);

export default DepthAmountDeckRequirement;
