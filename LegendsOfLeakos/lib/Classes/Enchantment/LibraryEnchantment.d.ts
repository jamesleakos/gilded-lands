import LibraryKeyword from '../Keyword/LibraryKeyword/LibraryKeyword';
import LibraryAbility from '../Ability/LibraryAbility';
declare class LibraryEnchantment {
    libraryId: number;
    name: string;
    description: string;
    keywords: LibraryKeyword[];
    abilities: LibraryAbility[];
    imageName: string;
    clone(): LibraryEnchantment;
    toJSON(): any;
    static fromJSON(json: any): LibraryEnchantment;
    static isJSONValid(json: any): boolean;
}
export default LibraryEnchantment;
