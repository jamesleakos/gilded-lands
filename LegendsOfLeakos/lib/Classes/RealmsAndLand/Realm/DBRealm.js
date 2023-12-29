// import LibraryBiome from '../Biome/LibraryBiome';
// import LibraryLandTile from '../LandTile/LibraryLandTile';
// class DBRealm {
//   name: string = 'New Realm';
//   biomes: LibraryBiome[] = [];
//   // Methods for adding stuff to the ecosystem
//   // Methods for validating what ecosystems are what.
//   // Getting info about the realm
//   // Cards
//   getNumCards(): number {
//     let count = 0;
//     for (const biome of this.biomes) {
//       count += biome.getAllCardsCount();
//     }
//     return count;
//   }
//   deleteAllCards(): void {
//     for (const biome of this.biomes) {
//       biome.deleteAllCards();
//     }
//   }
//   // Terrain
//   getLandTiles(): LibraryLandTile[] {
//     const tiles: LibraryLandTile[] = [];
//     for (const biome of this.biomes) {
//       tiles.push(...biome.landTiles);
//     }
//     return tiles.sort((a, b) => a.id - b.id);
//   }
//   isRealmValid(): boolean {
//     for (const biome of this.biomes) {
//       if (!biome.areBiomeAndSubsValid().isValid) return false;
//     }
//     return true;
//   }
//   static copyRealm(oldRealm: DBRealm): DBRealm {
//     const newRealm = new DBRealm();
//     newRealm.name = oldRealm.name;
//     for (const old of oldRealm.biomes) {
//       newRealm.biomes.push(LibraryBiome.copyBiome(old));
//     }
//     return newRealm;
//   }
// }
