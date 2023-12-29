import DeckRequirement from './DeckRequirement';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCard from '../Card/LibraryCard';
import GameManager from '../Game/GameManager';

class FullCardPerCardRequirement extends DeckRequirement {
  constructor(libraryId: number, perCardAmount: number, amount: number) {
    super();
    this.type = DeckReqType.FullCardPerCard;
    this.reqValues.set(DeckReqVariable.LibraryCardId, libraryId);
    this.reqValues.set(DeckReqVariable.PerCardAmount, perCardAmount);
    this.reqValues.set(DeckReqVariable.Amount, amount);
  }

  override myRequiredValues(): DeckReqVariable[] {
    return [
      DeckReqVariable.LibraryCardId,
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
    let deckEntry = myBiome.cards.find(
      (c) => c.libraryId === this.reqValues.get(DeckReqVariable.LibraryCardId)
    );
    if (deckEntry === undefined) return false;

    if (
      (deckEntry.amount / this.reqValues.get(DeckReqVariable.Amount)) *
        this.reqValues.get(DeckReqVariable.PerCardAmount) <
      numberOfMyCard
    )
      return false;

    return true;
  }

  override requirementToText(gameManager: GameManager): string {
    let cardInLibrary = gameManager.cardLibrary.find(
      (c) => c.libraryId === this.reqValues.get(DeckReqVariable.LibraryCardId)
    );
    return (
      this.reqValues.get(DeckReqVariable.Amount) +
      ' of ' +
      cardInLibrary.name +
      ' per ' +
      this.reqValues.get(DeckReqVariable.PerCardAmount)
    );
  }

  static override fromJSON(json: any): DeckRequirement {
    let amount = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.Amount
    ).value;
    let perCardAmount = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.PerCardAmount
    ).value;
    let libraryId = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.LibraryCardId
    ).value;
    if (!libraryId || !perCardAmount || !amount)
      throw new Error('Missing value in json');
    return new FullCardPerCardRequirement(libraryId, perCardAmount, amount);
  }
}

DeckRequirement.registerRequirement(
  DeckReqType.CardAmount,
  FullCardPerCardRequirement.fromJSON
);

export default FullCardPerCardRequirement;
