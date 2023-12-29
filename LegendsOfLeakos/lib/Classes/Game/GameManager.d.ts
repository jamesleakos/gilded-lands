import LibraryCard from '../Card/LibraryCard';
import LibraryEnchantment from '../Enchantment/LibraryEnchantment';
declare class GameManager {
    cardLibrary: LibraryCard[];
    enchantmentLibrary: LibraryEnchantment[];
    constructor(cardLibrary: LibraryCard[], enchantmentLibrary: LibraryEnchantment[]);
    getCardFromLibraryId(libraryId: number): LibraryCard;
    getEnchantmentFromLibraryId(libraryId: number): LibraryEnchantment;
    toJSON(): any;
    static fromJSON(json: any): GameManager;
    static generateUniqueId(length?: number): string;
}
export default GameManager;
