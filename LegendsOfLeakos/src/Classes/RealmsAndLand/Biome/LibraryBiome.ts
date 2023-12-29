import LibraryCardEntry from './LibraryCardEntry';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import LibraryCard from '../../Card/LibraryCard';
import RuntimeLandTile from '../LandTile/RuntimeLandTile';
import {
  BiomeAddCardEnum,
  BiomeDepth,
  BiomeType,
} from '../../../Enums/LandAndBiome';
import GameManager from '../../Game/GameManager';

//#region Messages

class BiomeAddCardMessage {
  result: BiomeAddCardEnum;
  numberAdded: number;
  message: string;

  constructor(result: BiomeAddCardEnum, numberAdded: number, message: string) {
    this.result = result;
    this.numberAdded = numberAdded;
    this.message = message;
  }
}

class BiomeValidMessage {
  isValid: boolean;
  message: string;

  constructor(isValid: boolean, message: string) {
    this.isValid = isValid;
    this.message = message;
  }
}
//#endregion

class LibraryBiome {
  name: string = 'New Biome';
  biomeType: number;
  biomeDepth: number;

  cards: LibraryCardEntry[] = [];
  landTiles: LibraryLandTile[] = [];
  subBiomes: LibraryBiome[] = [];

  //#region Landtiles

  getLandTiles(): LibraryLandTile[] {
    const tiles: LibraryLandTile[] = [];
    tiles.push(...this.landTiles);
    return tiles;
  }

  //#endregion

  // #region Biome / Card Requirement Validity

  wouldRemovingThisCardCauseErrors(
    card: LibraryCard,
    gameManager: GameManager
  ): BiomeValidMessage {
    const testBiome: LibraryBiome = LibraryBiome.copyBiome(this);
    testBiome.removeSingleCardFromBiomeOrSubbiome(card);
    return testBiome.areBiomeAndSubsValid(gameManager);
  }

  areBiomeAndSubsValid(
    gameManager: GameManager,
    message: BiomeValidMessage = new BiomeValidMessage(true, '')
  ): BiomeValidMessage {
    for (const entry of this.cards) {
      const card = gameManager.cardLibrary.find(
        (c) => c.libraryId === entry.libraryId
      );
      if (card === undefined) {
        throw new Error('The library is likely smaller than it used to be');
      }

      for (const req of card.deckRequirements) {
        if (!req.isRequirementMet(this, card.libraryId)) {
          message.isValid = false;
          message.message +=
            'The requirement of ' +
            req.requirementToText(gameManager) +
            ' is not met; ';
        }
      }
    }

    for (const sub of this.subBiomes) {
      const subResponse = sub.areBiomeAndSubsValid(gameManager, message);
      if (!subResponse.isValid) {
        message.isValid = false;
        message.message += subResponse.message;
      }
    }

    return message;
  }

  private cardsCanBeAddedToBiomeOrSubbiome(
    card: LibraryCard,
    amount: number,
    gameManager: GameManager
  ): BiomeAddCardMessage {
    if (!card) {
      return new BiomeAddCardMessage(
        BiomeAddCardEnum.Failure,
        0,
        'Card is undefined'
      );
    }
    if (card.biomeType !== this.biomeType) {
      return new BiomeAddCardMessage(
        BiomeAddCardEnum.Failure,
        0,
        `${card.name} belongs in the ${
          BiomeType[card.biomeType]
        } and this is a ${BiomeType[this.biomeType]}`
      );
    }
    if (
      card.biomeDepth < Math.max(...this.subBiomes.map((c) => c.biomeDepth))
    ) {
      return new BiomeAddCardMessage(
        BiomeAddCardEnum.Failure,
        0,
        `${card.name} requires ${BiomeDepth[card.biomeDepth]} ${
          BiomeType[card.biomeType]
        } and this only has ${BiomeDepth[this.biomeDepth]} ${
          BiomeType[this.biomeType]
        }`
      );
    }
    const thisDeck = this.cardsCanBeAddedToThisBiome(card, amount, gameManager);
    if (thisDeck.result !== BiomeAddCardEnum.Failure || card.biomeDepth === 0) {
      return thisDeck;
    } else {
      const rightSub = this.subBiomes.find(
        (c) => c.biomeDepth === card.biomeDepth
      );
      return rightSub.cardsCanBeAddedToThisBiome(card, amount, gameManager);
    }
  }

  private cardsCanBeAddedToThisBiome(
    card: LibraryCard,
    amount: number,
    gameManager: GameManager
  ): BiomeAddCardMessage {
    if (card.biomeType !== this.biomeType) {
      return new BiomeAddCardMessage(
        BiomeAddCardEnum.Failure,
        0,
        card.name +
          ' belongs in the ' +
          card.biomeType +
          ' and this is a ' +
          this.biomeType
      );
    }
    if (
      card.biomeDepth !== this.biomeDepth &&
      card.biomeDepth !== BiomeDepth.all
    ) {
      return new BiomeAddCardMessage(
        BiomeAddCardEnum.Failure,
        0,
        card.name +
          ' requires ' +
          card.biomeDepth +
          ' ' +
          card.biomeType +
          ' and this is a ' +
          this.biomeDepth +
          ' ' +
          this.biomeType
      );
    }

    let addedToDeck = 0;
    for (let i = 0; i < amount; i++) {
      let canAdd = true;
      let message = '';
      for (const req of card.deckRequirements) {
        if (!req.canBeAdded(this, card)) {
          canAdd = false;
          message = req.requirementToText(gameManager);
          break;
        }
      }
      if (canAdd) addedToDeck++;
      else {
        if (addedToDeck === 0) {
          return new BiomeAddCardMessage(
            BiomeAddCardEnum.Failure,
            0,
            'This ' +
              this.biomeDepth +
              ' ' +
              this.biomeType +
              ' does not satify ' +
              card.name +
              "'s requirement of " +
              message
          );
        } else {
          return new BiomeAddCardMessage(
            BiomeAddCardEnum.PartiallyAdded,
            0,
            'Copy ' +
              (addedToDeck + 1) +
              ' of ' +
              card.name +
              ' made the ' +
              this.biomeDepth +
              ' ' +
              this.biomeType +
              ' not satify ' +
              card.name +
              "'s requirement of " +
              message
          );
        }
      }
    }
    return new BiomeAddCardMessage(
      BiomeAddCardEnum.Success,
      addedToDeck,
      'Complete success'
    );
  }

  // #endregion

  // #region CARDS

  // #region getting and counting cards

  getCardsCount(): number {
    let count = 0;
    // count here
    for (const card of this.cards) {
      count += card.amount;
    }
    // add subbiome counts
    for (const sub of this.subBiomes) {
      count += sub.getCardsCount();
    }
    // return
    return count;
  }

  getCardsCountByLibraryID(libraryId: number): number {
    let count = 0;
    // count here
    const temp = this.cards.find((c) => c.libraryId === libraryId);
    if (temp != null) count += temp.amount;

    // add subbiome counts
    for (const sub of this.subBiomes) {
      count += sub.getCardsCountByLibraryID(libraryId);
    }
    // return
    return count;
  }
  // TODO : add corrent config type
  getCardsCountByCardType(config: any, cardTypeId: number): number {
    let count = 0;
    for (const card of this.cards) {
      // TODO not sure what id meanns here
      const libraryCard = config.cards.find((x: any) => x.id == card.libraryId);
      if (libraryCard && libraryCard.cardTypeId === cardTypeId) {
        count += card.amount;
        break;
      }
    }
    return count;
  }

  getAllCardsInBiomeAndSubbiomes(): LibraryCardEntry[] {
    const cards: LibraryCardEntry[] = [];
    cards.push(...this.cards);
    for (const sub of this.subBiomes) {
      cards.push(...sub.getAllCardsInBiomeAndSubbiomes());
    }
    return cards;
  }

  // #endregion

  // #region adding cards

  addCardsToBiomeOrSubbiome(
    card: LibraryCard,
    amount: number,
    gameManager: GameManager
  ): BiomeAddCardMessage {
    let result = this.cardsCanBeAddedToBiomeOrSubbiome(
      card,
      amount,
      gameManager
    );
    if (result.result === BiomeAddCardEnum.Failure) return result;

    result = this.cardsCanBeAddedToThisBiome(card, amount, gameManager);
    if (result.result !== BiomeAddCardEnum.Failure) {
      this.addCard(card, result.numberAdded);
      return result;
    } else {
      const subbiome = this.subBiomes.find(
        (c) => c.biomeDepth === card.biomeDepth
      );
      return subbiome.addCardsToBiomeOrSubbiome(card, amount, gameManager);
    }
  }

  private addCard(card: LibraryCard, amount: number): void {
    const existingCard = this.cards.find((x) => x.libraryId === card.libraryId);
    if (existingCard !== undefined) {
      existingCard.amount += amount;
    } else {
      this.cards.push(new LibraryCardEntry(card.libraryId, amount));
    }
  }

  // #endregion

  // #region removing cards
  deleteAllCards(): void {
    this.cards = [];
    for (const sub of this.subBiomes) {
      sub.deleteAllCards();
    }
  }

  removeSingleCardFromBiomeOrSubbiome(card: LibraryCard): boolean {
    if (this.removeSingleCard(card)) {
      return true;
    } else {
      for (const sub of this.subBiomes) {
        if (sub.removeSingleCardFromBiomeOrSubbiome(card)) return true;
      }
    }
    return false;
  }

  removeCards(card: any): void {
    const existingCard = this.cards.find((x) => x.libraryId === card.libraryId);
    if (existingCard !== undefined) {
      this.cards.splice(this.cards.indexOf(existingCard), 1);
    }
  }

  removeSingleCard(card: any): boolean {
    const existingCard = this.cards.find((x) => x.libraryId === card.libraryId);
    if (existingCard !== undefined) {
      if (existingCard.amount === 1)
        this.cards.splice(this.cards.indexOf(existingCard), 1);
      else existingCard.amount--;
      return true;
    } else {
      return false;
    }
  }
  // #endregion

  // #endregion

  // #region JSON and COPY utils

  toJSON(): any {
    const json: any = {};
    json.biomeType = BiomeType[this.biomeType];
    json.biomeDepth = BiomeDepth[this.biomeDepth];
    json.cards = [];
    for (const card of this.cards) {
      json.cards.push(card.toJSON());
    }
    json.subBiomes = [];
    for (const sub of this.subBiomes) {
      json.subBiomes.push(sub.toJSON());
    }
    json.landTiles = [];
    for (const tile of this.landTiles) {
      json.landTiles.push(tile.toJSON());
    }
    return json;
  }

  static fromJSON(json: any): LibraryBiome {
    const biome = new LibraryBiome();
    biome.biomeType = BiomeType[json.biomeType as keyof typeof BiomeType];
    biome.biomeDepth = BiomeDepth[json.biomeDepth as keyof typeof BiomeDepth];

    if (json.cards) {
      for (const card of json.cards) {
        biome.cards.push(LibraryCardEntry.fromJSON(card));
      }
    }
    if (json.subBiomes) {
      for (const sub of json.subBiomes) {
        biome.subBiomes.push(LibraryBiome.fromJSON(sub));
      }
    }
    if (json.landTiles) {
      for (const tile of json.landTiles) {
        biome.landTiles.push(LibraryLandTile.fromJSON(tile));
      }
    }
    return biome;
  }

  static copyBiome(oldBiome: LibraryBiome): LibraryBiome {
    const tempBiome = new LibraryBiome();
    tempBiome.biomeType = oldBiome.biomeType;
    tempBiome.biomeDepth = oldBiome.biomeDepth;
    tempBiome.cards = [];
    tempBiome.landTiles = [];

    for (const newCard of oldBiome.cards) {
      const tempCardEntry = new LibraryCardEntry(
        newCard.libraryId,
        newCard.amount
      );

      tempBiome.cards.push(tempCardEntry);
    }

    for (const tile of oldBiome.landTiles) {
      const tempLandTile = LibraryLandTile.fromJSON(tile.toJSON());

      tempBiome.landTiles.push(tempLandTile);
    }

    for (const subBiome of oldBiome.subBiomes) {
      tempBiome.subBiomes.push(LibraryBiome.copyBiome(subBiome));
    }

    return tempBiome;
  }

  static copyAllCardsBetweenBiomes(
    oldBiome: LibraryBiome,
    newBiome: LibraryBiome
  ): void {
    newBiome.cards = [];
    for (const card of oldBiome.cards) {
      newBiome.cards.push(new LibraryCardEntry(card.libraryId, card.amount));
    }
    for (const subBiome of oldBiome.subBiomes) {
      const newSubBiome = newBiome.subBiomes.find(
        (c) => c.biomeDepth === subBiome.biomeDepth
      );
      if (newSubBiome !== undefined) {
        LibraryBiome.copyAllCardsBetweenBiomes(subBiome, newSubBiome);
      }
    }
  }

  // #endregion
}

// export
export default LibraryBiome;
