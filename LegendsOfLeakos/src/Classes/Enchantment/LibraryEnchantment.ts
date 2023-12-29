import LibraryKeyword from '../Keyword/LibraryKeyword/LibraryKeyword';
import LibraryAbility from '../Ability/LibraryAbility';

class LibraryEnchantment {
  libraryId: number;
  name: string;
  description: string;
  keywords: LibraryKeyword[];
  abilities: LibraryAbility[];
  imageName: string;

  clone(): LibraryEnchantment {
    return LibraryEnchantment.fromJSON(this.toJSON());
  }

  toJSON(): any {
    return {
      libraryId: this.libraryId,
      name: this.name,
      description: this.description,
      keywords: this.keywords.map((x) => x.toJSON()),
      abilities: this.abilities.map((x) => x.toJSON()),
      imageName: this.imageName,
    };
  }

  static fromJSON(json: any): LibraryEnchantment {
    const newEnchantment = new LibraryEnchantment();
    newEnchantment.libraryId = json.libraryId;
    newEnchantment.name = json.name;
    newEnchantment.description = json.description;
    newEnchantment.keywords = json.keywords.map((x: any) =>
      LibraryKeyword.fromJSON(x)
    );
    newEnchantment.abilities = json.abilities.map((x: any) =>
      LibraryAbility.fromJSON(x)
    );
    newEnchantment.imageName = json.imageName;
    return newEnchantment;
  }

  static isJSONValid(json: any): boolean {
    if (json.libraryId === undefined) {
      return false;
    }
    if (json.name === undefined) {
      return false;
    }
    if (json.description === undefined) {
      return false;
    }
    if (json.keywords === undefined) {
      return false;
    }
    if (json.abilities === undefined) {
      return false;
    }
    if (json.imageName === undefined) {
      return false;
    }
    return true;
  }
}

export default LibraryEnchantment;
