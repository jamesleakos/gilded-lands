import DeckRequirement from './DeckRequirement';
import { DeckReqType, DeckReqVariable } from '../../Enums/DeckRequirements';
import LibraryCard from '../Card/LibraryCard';
import LibraryBiome from '../RealmsAndLand/Biome/LibraryBiome';
import LibraryCardEntry from '../RealmsAndLand/Biome/LibraryCardEntry';
import GameManager from '../Game/GameManager';

class CardAmountDeckRequirement extends DeckRequirement {
  constructor(libraryId: number, amount: number) {
    super();
    this.type = DeckReqType.CardAmount;
    this.reqValues.set(DeckReqVariable.Amount, amount);
    this.reqValues.set(DeckReqVariable.LibraryCardId, libraryId);
  }

  override myRequiredValues(): DeckReqVariable[] {
    return [DeckReqVariable.Amount, DeckReqVariable.LibraryCardId];
  }

  override canBeAdded(myBiome: LibraryBiome, myCard: LibraryCard): boolean {
    return this.isRequirementMet(myBiome, myCard.libraryId);
  }

  override isRequirementMet(
    myBiome: LibraryBiome,
    libraryCardID: number
  ): boolean {
    let counter = 0;
    let libraryCardEntry: LibraryCardEntry = myBiome.cards.find(
      (c) => c.libraryId === this.reqValues.get(DeckReqVariable.LibraryCardId)
    );
    if (libraryCardEntry !== undefined) {
      counter += libraryCardEntry.amount;
    }
    for (let subbiome of myBiome.subBiomes) {
      let subCardEntry = subbiome.cards.find(
        (c) => c.libraryId === this.reqValues.get(DeckReqVariable.LibraryCardId)
      );
      if (subCardEntry !== undefined) {
        counter += subCardEntry.amount;
      }
    }

    return counter >= this.reqValues.get(DeckReqVariable.Amount);
  }

  override requirementToText(gameManager: GameManager): string {
    return (
      this.reqValues.get(DeckReqVariable.Amount) +
      ' of ' +
      gameManager.cardLibrary.find(
        (c) => c.libraryId === this.reqValues.get(DeckReqVariable.LibraryCardId)
      ).name
    );
  }

  static override fromJSON(json: any): CardAmountDeckRequirement {
    let libraryId = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.LibraryCardId
    ).value;
    let amount = json.reqValues.find(
      (c: any) => c.key === DeckReqVariable.Amount
    ).value;
    if (!libraryId || !amount) throw new Error('Missing value in json');
    return new CardAmountDeckRequirement(libraryId, amount);
  }
}

DeckRequirement.registerRequirement(
  DeckReqType.CardAmount,
  CardAmountDeckRequirement.fromJSON
);

export default CardAmountDeckRequirement;
