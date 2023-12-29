declare class LibraryCard {
    libraryId: number;
    cardTypeId: number;
    name: String;
    biomeType: any;
    biomeDepth: any;
    cardText: String;
    imageName: String;
    costs: any[];
    deckRequirements: any[];
    libraryKeywords: any[];
    activatedAbilities: any[];
    battlecryAbilities: any[];
    cardUpgrades: any[];
    getCardUpgradeByUpgradeIndex(index: number): any;
}
export default LibraryCard;
