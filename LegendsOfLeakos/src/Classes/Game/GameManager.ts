import LibraryCard from '../Card/LibraryCard';
import LibraryEnchantment from '../Enchantment/LibraryEnchantment';
//
// In-game entry point to all data outside of game state.

class GameManager {
  // Properties now exist in their own static class - much easier to refernence that way

  // library objects
  cardLibrary: LibraryCard[] = [];
  enchantmentLibrary: LibraryEnchantment[] = [];

  // constructor
  constructor(
    cardLibrary: LibraryCard[],
    enchantmentLibrary: LibraryEnchantment[]
  ) {
    this.cardLibrary = cardLibrary;
    this.enchantmentLibrary = enchantmentLibrary;
  }

  // methods
  public getCardFromLibraryId(libraryId: number): LibraryCard {
    const card: LibraryCard | undefined = this.cardLibrary.find(
      (x) => x.libraryId === libraryId
    );
    if (card === undefined) {
      throw new Error(`Could not find card with libraryId ${libraryId}`);
    }
    return card;
  }

  public getEnchantmentFromLibraryId(libraryId: number): LibraryEnchantment {
    const enchantment: LibraryEnchantment | undefined =
      this.enchantmentLibrary.find((x) => x.libraryId === libraryId);
    if (enchantment === undefined) {
      throw new Error(`Could not find enchantment with libraryId ${libraryId}`);
    }
    return enchantment;
  }

  public toJSON(): any {
    return {
      cardLibrary: this.cardLibrary.map((x) => x.toJSON()),
      enchantmentLibrary: this.enchantmentLibrary.map((x) => x.toJSON()),
    };
  }

  static fromJSON(json: any): GameManager {
    return new GameManager(
      json.cardLibrary.map((x: any) => LibraryCard.fromJSON(x)),
      json.enchantmentLibrary.map((x: any) => LibraryEnchantment.fromJSON(x))
    );
  }

  // utility methods
  static generateUniqueId(length: number = 20): string {
    // need to make sure length is at least 20
    if (length < 20) length = 20;

    let result: string = '';
    const characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    const timePart: string = Date.now().toString(36);
    let randomPartLength: number = length - timePart.length;

    for (let i: number = 0; i < randomPartLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return timePart + result;
  }
}

export default GameManager;
