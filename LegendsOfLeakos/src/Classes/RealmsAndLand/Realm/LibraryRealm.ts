import LibraryBiome from '../Biome/LibraryBiome';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import LibraryCard from '../../Card/LibraryCard';
// enums
import {
  BiomeType,
  BiomeDepth,
  LandType,
  BiomeAddCardEnum,
} from '../../../Enums/LandAndBiome';
import GameManager from '../../Game/GameManager';
import LibraryCardEntry from '../Biome/LibraryCardEntry';
import GameProperties from '../../Game/GameProperties';

class LibraryRealm {
  name: string = 'New Realm';
  biomes: LibraryBiome[] = [];

  // #region Simple Card Utilities

  getNumCards(): number {
    let count = 0;
    for (const biome of this.biomes) {
      count += biome.getCardsCount();
    }
    return count;
  }

  deleteAllCards(): void {
    for (const biome of this.biomes) {
      biome.deleteAllCards();
    }
  }

  getAllCards(): LibraryCardEntry[] {
    const cards: LibraryCardEntry[] = [];
    for (const biome of this.biomes) {
      cards.push(...biome.getAllCardsInBiomeAndSubbiomes());
    }
    return cards;
  }

  // #endregion

  // #region Land Tiles

  getLandTiles(): LibraryLandTile[] {
    const tiles: LibraryLandTile[] = [];
    for (const biome of this.biomes) {
      tiles.push(...biome.getLandTiles());
    }
    return tiles.sort((a, b) => a.id - b.id);
  }

  changeLandTileType(tile_id: number, newLandType: LandType): void {
    const tiles = this.getLandTiles();
    // get the tile we want to change
    const tile = tiles.find((c) => c.id === tile_id);
    if (tile === undefined) {
      console.log('Error, tile not found');
      return;
    }
    tile.landType = newLandType;
    this.initalizeLandTiles(GameProperties.realmLayout);
    // TODO: update realm
    this.updateRealm();
  }

  // #endregion

  // #region Realm Utilities

  isRealmValid(gameManager: GameManager): boolean {
    // REALM STUFF

    // make sure there's exactly one city
    const cities = this.getLandTiles().filter(
      (c) => c.landType === LandType.city
    );
    if (cities.length !== 1) {
      console.log('Error, not exactly one city');
      return false;
    }

    // re-assign the coordinates, in case there's something funky happening
    this.initalizeLandTiles();

    // make sure that there are the right amount of land tiles
    const landTiles = this.getLandTiles();
    const layoutSum = GameProperties.realmLayout.reduce(
      (a: number, b: number) => a + b,
      0
    );
    if (landTiles.length !== layoutSum) {
      console.log('Error, tiles dont match');
      return false;
    }

    // just try to init the tiles
    try {
      this.initalizeLandTiles();
    } catch {
      console.log('Error, couldnt init tiles');
      return false;
    }

    // BIOME STUFF
    // make sure all biomes are valid
    for (const biome of this.biomes) {
      if (!biome.areBiomeAndSubsValid(gameManager)) {
        console.log('Error, biome not valid');
        return false;
      }
    }
    return true;
  }

  static copyRealm(oldRealm: LibraryRealm): LibraryRealm {
    const newRealm = new LibraryRealm();
    newRealm.name = oldRealm.name;
    for (const old of oldRealm.biomes) {
      newRealm.biomes.push(LibraryBiome.copyBiome(old));
    }
    newRealm.initalizeLandTiles();

    return newRealm;
  }

  // #endregion

  // #region Updating Landtiles and Cards

  initalizeLandTiles(
    realmLayout: any = [7, 10, 11, 12, 11, 12, 11, 10, 7]
  ): void {
    const tiles = this.getLandTiles();
    LibraryLandTile.assignCoords(tiles, realmLayout);
    LibraryLandTile.assignDepth(tiles);
  }

  updateRealm(): void {
    const newBiomes: LibraryBiome[] = [];

    const landTypeBiomeTypePairs: [LandType, BiomeType][] = [
      [LandType.forest, BiomeType.forest],
      [LandType.ocean, BiomeType.ocean],
      [LandType.desert, BiomeType.desert],
      [LandType.mountain, BiomeType.mountain],
      [LandType.prairie, BiomeType.prairie],
      [LandType.fells, BiomeType.fells],
      [LandType.tundra, BiomeType.tundra],
      [LandType.city, BiomeType.city],
    ];

    // add the land tiles to the the new biomes
    const landTiles = this.getLandTiles();
    for (const [landType, biomeType] of landTypeBiomeTypePairs) {
      for (const landTile of landTiles) {
        if (landTile.landType === landType) {
          LibraryRealm.biomeAdder(landTile, landTiles, biomeType, newBiomes);
        }
      }
    }

    // new biome identifies most likely precursor from old biome based on boimeType
    // and number of land tiles in common
    // and then adds cards from old biome to new biome, if allowed
    for (const newBiome of newBiomes) {
      // get list of old biomes that are the same type
      const oldBiomes = this.biomes.filter(
        (c) => c.biomeType === newBiome.biomeType
      );
      // get the old biome that has the most land tiles in common
      let bestOldBiome: LibraryBiome | undefined = undefined;
      let bestCount = 0;
      for (const oldBiome of oldBiomes) {
        const count = LibraryRealm.getLandTileCountInCommon(oldBiome, newBiome);
        if (count > bestCount) {
          bestOldBiome = oldBiome;
          bestCount = count;
        }
      }
      // if we found a best old biome, add cards from it to the new biome
      if (bestOldBiome !== undefined) {
        LibraryBiome.copyAllCardsBetweenBiomes(bestOldBiome, newBiome);
      }
    }

    this.biomes = newBiomes;
  }

  static getLandTileCountInCommon(
    oldBiome: LibraryBiome,
    newBiome: LibraryBiome
  ): number {
    let count = 0;
    for (const oldTile of oldBiome.landTiles) {
      for (const newTile of newBiome.landTiles) {
        if (oldTile.id === newTile.id) {
          count++;
        }
      }
    }
    return count;
  }

  static biomeAdder(
    landTile: LibraryLandTile,
    allLandtiles: LibraryLandTile[],
    biomeType: BiomeType,
    tempBiomes: LibraryBiome[]
  ): void {
    const biomes = tempBiomes.filter((c) => c.biomeType === biomeType);
    let found = false;
    for (const biome of biomes) {
      const newSortedTile = biome.landTiles.find((c) => c.id === landTile.id);
      if (newSortedTile !== undefined) {
        found = true;
      }
    }
    if (!found) {
      const tempBiome = new LibraryBiome();
      tempBiome.biomeType = biomeType;
      tempBiome.biomeDepth = BiomeDepth.all;
      tempBiome.cards = [];
      tempBiome.landTiles = [];
      tempBiomes.push(tempBiome);

      LibraryRealm.recursiveTileAdder(landTile, allLandtiles, tempBiome);
      LibraryLandTile.assignDepth(allLandtiles);

      // And then we add subBiomes
      const shallowBiome = new LibraryBiome();
      shallowBiome.biomeType = biomeType;
      shallowBiome.biomeDepth = BiomeDepth.shallow;
      shallowBiome.cards = [];
      shallowBiome.landTiles = [];
      tempBiome.subBiomes.push(shallowBiome);

      const midBiome = new LibraryBiome();
      midBiome.biomeType = biomeType;
      midBiome.biomeDepth = BiomeDepth.mid;
      midBiome.cards = [];
      midBiome.landTiles = [];
      tempBiome.subBiomes.push(midBiome);

      const deepBiome = new LibraryBiome();
      deepBiome.biomeType = biomeType;
      deepBiome.biomeDepth = BiomeDepth.deep;
      deepBiome.cards = [];
      deepBiome.landTiles = [];
      tempBiome.subBiomes.push(deepBiome);

      for (const lt of tempBiome.landTiles) {
        if (lt.depth === 1) {
          shallowBiome.landTiles.push(lt);
        } else if (lt.depth === 2) {
          midBiome.landTiles.push(lt);
        } else if (lt.depth > 2) {
          deepBiome.landTiles.push(lt);
        } else {
          console.log('Error, please check this. lt.depth == ' + lt.depth);
        }
      }

      tempBiome.subBiomes = tempBiome.subBiomes.filter(
        (c) => c.landTiles.length > 0
      );
    }
  }

  public static recursiveTileAdder(
    landTile: LibraryLandTile,
    allLandtiles: LibraryLandTile[],
    tempBiome: LibraryBiome
  ): void {
    tempBiome.landTiles.push(landTile);
    for (const neighbor of landTile.findNeighbors(allLandtiles)) {
      if (neighbor.landType === landTile.landType) {
        const sortedTile = tempBiome.landTiles.find(
          (c) => c.id === neighbor.id
        );
        if (sortedTile === undefined) {
          this.recursiveTileAdder(
            neighbor as LibraryLandTile,
            allLandtiles,
            tempBiome
          );
        }
      }
    }
  }

  // #endregion

  // #region JSON Conversion

  static fromJSON(json: any): LibraryRealm {
    const realm = new LibraryRealm();
    realm.name = json.name;
    realm.biomes = [];
    for (const biome of json.biomes) {
      realm.biomes.push(LibraryBiome.fromJSON(biome));
    }
    realm.initalizeLandTiles();
    // should already have depth and coordinates assigned

    return realm;
  }

  toJSON(): any {
    const json: any = {};
    json.name = this.name;
    json.biomes = [];
    for (const biome of this.biomes) {
      json.biomes.push(biome.toJSON());
    }
    return json;
  }

  // #endregion
}

export default LibraryRealm;
