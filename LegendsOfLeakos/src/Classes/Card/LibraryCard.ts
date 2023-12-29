import LibraryKeyword from '../Keyword/LibraryKeyword/LibraryKeyword';
import RuntimeAbility from '../Ability/RuntimeAbility';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import CardUpgrade from './CardUpgrade';
import DeckRequirement from '../DeckRequirement/DeckRequirement';
import { BiomeType, BiomeDepth } from '../../Enums/LandAndBiome';
import Stat from '../Stat/Stat';
import RuntimeKeyword from '../Keyword/RuntimeKeyword/RuntimeKeyword';
import LibraryAbility from '../Ability/LibraryAbility';

class LibraryCard {
  libraryId: number;
  cardTypeId: number;
  name: String;
  biomeType: BiomeType;
  biomeDepth: BiomeDepth;
  cardText: String;
  imageName: String;
  // stats - saved as numbers in the library card
  attack: number;
  health: number;
  priority: number;

  // costs
  costs: PayResourceCost[] = [];

  // reqs
  deckRequirements: DeckRequirement[] = [];

  // abilities and keywords
  keywords: LibraryKeyword[] = [];
  abilities: LibraryAbility[] = [];

  // upgrades
  cardUpgrades: CardUpgrade[] = [];

  getCardUpgradeByUpgradeIndex(index: number): any {
    return this.cardUpgrades.find((c: any) => c.upgradeIndex === index);
  }

  clone(): LibraryCard {
    const json = this.toJSON();
    return LibraryCard.fromJSON(json);
  }

  toJSON(): any {
    return {
      libraryId: this.libraryId,
      cardTypeId: this.cardTypeId,
      name: this.name,
      biomeType: BiomeType[this.biomeType],
      biomeDepth: BiomeDepth[this.biomeDepth],
      cardText: this.cardText,
      imageName: this.imageName,
      attack: this.attack,
      health: this.health,
      priority: this.priority,
      costs: this.costs.map((c) => c.toJSON()),
      deckRequirements: this.deckRequirements.map((c) => c.toJSON()),
      keywords: this.keywords.map((c) => c.toJSON()),
      abilities: this.abilities.map((c) => c.toJSON()),
      cardUpgrades: this.cardUpgrades.map((c) => c.toJSON()),
    };
  }

  static fromJSON(json: any): LibraryCard {
    const newCard = new LibraryCard();
    newCard.libraryId = json.libraryId;
    newCard.cardTypeId = json.cardTypeId;
    newCard.name = json.name;
    newCard.biomeType = BiomeType[json.biomeType as keyof typeof BiomeType];
    newCard.biomeDepth = BiomeDepth[json.biomeDepth as keyof typeof BiomeDepth];
    newCard.cardText = json.cardText;
    newCard.imageName = json.imageName;
    newCard.attack = json.attack;
    newCard.health = json.health;
    newCard.priority = json.priority;

    for (const c of json.costs) {
      newCard.costs.push(PayResourceCost.fromJSON(c));
    }

    for (const c of json.deckRequirements) {
      newCard.deckRequirements.push(DeckRequirement.fromJSON(c));
    }

    for (const c of json.keywords) {
      newCard.keywords.push(LibraryKeyword.fromJSON(c));
    }

    for (const c of json.abilities) {
      newCard.abilities.push(LibraryAbility.fromJSON(c));
    }

    for (const c of json.cardUpgrades) {
      newCard.cardUpgrades.push(CardUpgrade.fromJSON(c));
    }

    return newCard;
  }

  static isLibraryJSONValid(json: any): boolean {
    if (typeof json.libraryId !== 'number') {
      console.log('Invalid libraryId');
      return false;
    }
    if (typeof json.cardTypeId !== 'number') {
      console.log('Invalid cardTypeId');
      return false;
    }
    if (typeof json.name !== 'string') {
      console.log('Invalid name');
      return false;
    }
    if (
      typeof json.biomeType !== 'string' ||
      !Object.values(BiomeType).includes(json.biomeType)
    ) {
      console.log('Invalid biomeType');
      return false;
    }
    if (
      typeof json.biomeDepth !== 'string' ||
      !Object.values(BiomeDepth).includes(json.biomeDepth)
    ) {
      console.log('Invalid biomeDepth');
      return false;
    }
    if (typeof json.cardText !== 'string') {
      console.log('Invalid cardText');
      return false;
    }
    if (typeof json.imageName !== 'string') {
      console.log('Invalid imageName');
      return false;
    }
    if (typeof json.attack !== 'number' || json.attack < 0) {
      console.log('Invalid attack');
      return false;
    }
    if (typeof json.health !== 'number' || json.health < 0) {
      console.log('Invalid health');
      return false;
    }
    if (typeof json.priority !== 'number' || json.priority < 0) {
      console.log('Invalid priority');
      return false;
    }
    if (
      !Array.isArray(json.costs) ||
      !json.costs.every(PayResourceCost.isLibraryJSONValid)
    ) {
      console.log('Invalid costs');
      return false;
    }
    if (
      !Array.isArray(json.deckRequirements) ||
      !json.deckRequirements.every((req: any) =>
        DeckRequirement.isLibraryJSONValid(req)
      )
    ) {
      console.log('Invalid deckRequirements');
      return false;
    }
    if (
      !Array.isArray(json.keywords) ||
      !json.keywords.every((lk: any) => RuntimeKeyword.isLibraryJSONValid(lk))
    ) {
      console.log('Invalid libraryKeywords');
      return false;
    }
    if (
      !Array.isArray(json.abilities) ||
      !json.abilities.every((aa: any) => RuntimeAbility.isLibraryJSONValid(aa))
    ) {
      console.log('Invalid abilities');
      return false;
    }

    // do this at some point but don't want to now
    // if (
    //   !Array.isArray(json.cardUpgrades) ||
    //   !json.cardUpgrades.every((cu) => CardUpgrade.isLibraryJSONValid(cu))
    // ) {
    //   console.log('Invalid cardUpgrades');
    //   return false;
    // }

    return true;
  }
}

export default LibraryCard;
