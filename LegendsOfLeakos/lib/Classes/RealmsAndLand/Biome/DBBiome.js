// import LibraryCardEntry from './LibraryCardEntry';
// import LibraryLandTile from '../LandTile/LibraryLandTile';
// class LibraryBiome {
//   biomeType: number;
//   biomeDepth: number;
//   cards: LibraryCardEntry[] = [];
//   landTiles: LibraryLandTile[] = [];
//   subBiomes: LibraryBiome[] = [];
//   static copyBiome(oldBiome: LibraryBiome): LibraryBiome {
//     const tempBiome = new LibraryBiome();
//     tempBiome.biomeType = oldBiome.biomeType;
//     tempBiome.biomeDepth = oldBiome.biomeDepth;
//     tempBiome.cards = [];
//     tempBiome.landTiles = [];
//     for (const newCard of oldBiome.cards) {
//       const tempDeckEntry = new LibraryCardEntry();
//       tempDeckEntry.amount = newCard.amount;
//       tempDeckEntry.libraryId = newCard.libraryId;
//       tempBiome.cards.push(tempDeckEntry);
//     }
//     for (const newLand of oldBiome.landTiles) {
//       const tempRealmEntry = new LibraryLandTile();
//       tempRealmEntry.id = newLand.id;
//       tempRealmEntry.landType = newLand.landType;
//       tempRealmEntry.x = newLand.x;
//       tempRealmEntry.y = newLand.y;
//       tempRealmEntry.z = newLand.z;
//       tempRealmEntry.depth = newLand.depth;
//       tempBiome.terrain.landTiles.push(tempRealmEntry);
//     }
//     for (const subBiome of oldBiome.subBiomes) {
//       tempBiome.subBiomes.push(LibraryBiome.copyBiome(subBiome));
//     }
//     return tempBiome;
//   }
//   // Cards
//   // Adding Cards
//   // Implement the rest of the methods
//   addCardsToDeck(card: Card, amount: number): BiomeAddCardMessage {
//     // ... implementation
//   }
//   private cardsCanBeAddedToBiomeOrSubbiome(
//     card: Card,
//     amount: number
//   ): BiomeAddCardMessage {
//     // ... implementation
//   }
//   private cardsCanBeAddedToDeck(
//     card: Card,
//     amount: number
//   ): BiomeAddCardMessage {
//     // ... implementation
//   }
//   // Removing Cards
//   public recursiveSingleCardRemover(card: Card): void {
//     // ... implementation
//   }
//   public deleteAllCards(): void {
//     // ... implementation
//   }
//   // Card Count
//   public getAllCardsCountByLibraryID(libraryId: number): number {
//     // ... implementation
//   }
//   public getAllCardsCount(): number {
//     // ... implementation
//   }
//   // Biome / Card Requirement Validity
//   public wouldRemovingThisCardCauseErrors(card: Card): BiomeValidMessage {
//     // ... implementation
//   }
//   public areBiomeAndSubsValid(
//     message: BiomeValidMessage | null = null
//   ): BiomeValidMessage {
//     // ... implementation
//   }
// }
// // exportt
// export default LibraryBiome;
