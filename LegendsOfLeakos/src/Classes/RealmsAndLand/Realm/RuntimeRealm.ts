import LibraryCard from '../../Card/LibraryCard';
import GameState from '../../Game/GameState';
import PlayerInfo from '../../Player/PlayerInfo';
import RuntimeZone from '../../Zone/RuntimeZone';
import RuntimeBiome from '../Biome/RuntimeBiome';
import RuntimeCard from '../../Card/RuntimeCard';
import RuntimeLandTile from '../LandTile/RuntimeLandTile';
import LibraryRealm from './LibraryRealm';

class RuntimeRealm {
  name: string = 'New Realm';
  biomes: RuntimeBiome[] = [];
  landTiles: RuntimeLandTile[] = [];

  // #region Landtiles

  getLandTile(id: number): RuntimeLandTile {
    const landTile = this.landTiles.find((x) => x.id === id);
    if (!landTile) {
      throw new Error(
        'Landtile not found with id ' +
          id +
          ' in realm with landtiles ' +
          this.landTiles.map((x) => x.id)
      );
    }
    return landTile;
  }

  exploreLandTile(id: number): void {
    const landTile = this.getLandTile(id);
    landTile.explore();
  }

  public landtileIsNeighborOfExploredTile(landtileID: number): boolean {
    const landTile = this.getLandTile(landtileID);
    const neighbors = landTile.findNeighbors(
      this.landTiles
    ) as RuntimeLandTile[];
    return neighbors.some((x) => x.explored);
  }

  // #endregion

  // #region JSON and registration

  toJSONFullCopy(): any {
    return {
      name: this.name,
      biomes: this.biomes.map((biome) => biome.toJSONFullCopy()),
      landTiles: this.landTiles.map((landTile) => landTile.toJSON()),
    };
  }

  toJSONForOpponent(): any {
    return {
      name: this.name,
      biomes: this.biomes.map((biome) => biome.toJSONForOpponent()),
      landTiles: this.landTiles.map((landTile) => landTile.toJSON()),
    };
  }

  clone(): RuntimeRealm {
    return RuntimeRealm.fromRuntimeJSON(this.toJSONFullCopy());
  }

  static fromRuntimeJSON(json: any): RuntimeRealm {
    const realm = new RuntimeRealm();
    realm.name = json.name;
    realm.biomes = json.biomes.map((biome: any) =>
      RuntimeBiome.fromRuntimeJSON(biome)
    );
    realm.landTiles = json.landTiles.map((landTile: any) =>
      RuntimeLandTile.fromJSON(landTile)
    );
    return realm;
  }

  static registerRealmAndAddCardsToDeck(
    libraryRealm: LibraryRealm,
    deck: RuntimeZone,
    player: PlayerInfo,
    cardLibrary: LibraryCard[],
    realmLayout: any
  ): RuntimeRealm {
    if (
      !libraryRealm ||
      !libraryRealm.biomes ||
      libraryRealm.biomes.length === 0
    ) {
      throw new Error('bad library realm');
    }
    const realm = new RuntimeRealm();
    realm.name = libraryRealm.name;
    // it's not as simple as converting just the biomes
    // RuntimeBiomes don't nest other biomes, but LibraryBiomes do

    // first, we need to get all of the landtiles - landtiles can be shared by different biomes
    const landtiles = [];
    for (const biome of libraryRealm.biomes) {
      landtiles.push(
        ...RuntimeBiome.createRuntimeLandtilesFromLibraryBiome(biome)
      );
    }
    // filter out duplicate ids - this is important so that biomes will share the same landtiles
    landtiles.filter(
      (landTile, index, self) =>
        self.findIndex((x) => x.id === landTile.id) === index
    );
    // sort by id
    landtiles.sort((a, b) => a.id - b.id);
    realm.landTiles = landtiles;

    // then, we can add these landtiles to the biomes, add the biomes to the realm, and get the deck
    realm.biomes = RuntimeBiome.registerBiomeAndAddCardsToDeck(
      libraryRealm.biomes,
      realm.landTiles,
      deck,
      player,
      cardLibrary
    );
    // Set Land and ecosystem
    RuntimeLandTile.assignCoords(realm.landTiles, realmLayout);
    RuntimeLandTile.assignDepth(realm.landTiles);

    return realm;
  }

  // #endregion
}

export default RuntimeRealm;
