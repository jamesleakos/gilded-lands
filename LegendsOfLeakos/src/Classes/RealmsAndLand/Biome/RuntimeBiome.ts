import RuntimeCard from '../../Card/RuntimeCard';
import RuntimeLandTile from '../LandTile/RuntimeLandTile';
import { BiomeDepth, BiomeType } from '../../../Enums/LandAndBiome';
import GameState from '../../Game/GameState';
import RuntimeZone from '../../Zone/RuntimeZone';
import PlayerInfo from '../../Player/PlayerInfo';
import LibraryCard from '../../Card/LibraryCard';
import LibraryBiome from './LibraryBiome';
import { describe } from 'node:test';

/**
 * The RuntimeBiome has one main purpose. During the game, it provides the relationship between
 * the RuntimeCards (the acutal instances of which reside in the playerInfo's RuntimeZones),
 * and the landTiles. Therefore, if a landTile is explored, the cards in the biome can be drawn */
class RuntimeBiome {
  biomeType: BiomeType;
  biomeDepth: BiomeDepth;
  cardInstanceIds: number[];
  landTileIds: number[];

  toJSONFullCopy(): any {
    return {
      biomeType: BiomeType[this.biomeType],
      biomeDepth: BiomeDepth[this.biomeDepth],
      cardInstanceIds: this.cardInstanceIds,
      landTileIds: this.landTileIds,
    };
  }

  toJSONForOpponent(): any {
    return {
      biomeType: BiomeType[this.biomeType],
      biomeDepth: BiomeDepth[this.biomeDepth],
      cardInstanceIds: [],
      landTileIds: this.landTileIds,
    };
  }

  static fromRuntimeJSON(json: any): RuntimeBiome {
    try {
      const biome = new RuntimeBiome();
      biome.biomeType = BiomeType[json.biomeType as keyof typeof BiomeType];
      biome.biomeDepth = BiomeDepth[json.biomeDepth as keyof typeof BiomeDepth];
      biome.cardInstanceIds = json.cardInstanceIds.map((id: any) => id);
      biome.landTileIds = json.landTileIds.map((id: any) => id);
      return biome;
    } catch (error) {
      console.log('Error in RuntimeBiome.fromRuntimeJSON');
      console.log(error);
      console.log(json);
      return null;
    }
  }

  static createRuntimeLandtilesFromLibraryBiome(
    libraryBiome: LibraryBiome
  ): RuntimeLandTile[] {
    if (!libraryBiome) {
      throw new Error('LibraryBiome not created successfully');
    }
    const landTiles: RuntimeLandTile[] = [];

    for (const libraryLandTile of libraryBiome.landTiles) {
      const landTile = RuntimeLandTile.fromJSON(libraryLandTile.toJSON());
      landTiles.push(landTile);
    }

    for (const subBiome of libraryBiome.subBiomes) {
      const subLandtiles =
        RuntimeBiome.createRuntimeLandtilesFromLibraryBiome(subBiome);
      landTiles.push(...subLandtiles);
    }

    // return unique landtiles
    return landTiles.filter(
      (landTile, index, self) =>
        self.findIndex((x) => x.id === landTile.id) === index
    );
  }

  static registerBiomeAndAddCardsToDeck(
    libraryBiomes: LibraryBiome[],
    allLandtiles: RuntimeLandTile[],
    deck: RuntimeZone,
    player: PlayerInfo,
    cardLibrary: LibraryCard[]
  ): RuntimeBiome[] {
    const biomes: RuntimeBiome[] = [];

    for (const libraryBiome of libraryBiomes) {
      const biome = new RuntimeBiome();
      biome.biomeType = libraryBiome.biomeType;
      biome.biomeDepth = libraryBiome.biomeDepth;

      // add the cards
      biome.cardInstanceIds = [];
      // for each entry in the library biome (libID plus amount), add that number to the deck
      libraryBiome.cards.forEach((libEntry: any) => {
        const cards = RuntimeCard.cardsFromLibraryCardEntry(
          libEntry,
          deck,
          player,
          cardLibrary
        );
        // add to deck
        deck.cards.push(...cards);
        // add IDs to biome
        biome.cardInstanceIds.push(...cards.map((c) => c.instanceId));
      });

      // add the landtileIds
      biome.landTileIds = libraryBiome.landTiles.map((lt) => lt.id);

      // add the biome to biomes and get the subbiomes
      biomes.push(biome);
      const subBiomes = RuntimeBiome.registerBiomeAndAddCardsToDeck(
        libraryBiome.subBiomes,
        allLandtiles,
        deck,
        player,
        cardLibrary
      );
      biomes.push(...subBiomes);
    }
    return biomes;
  }
}

export default RuntimeBiome;
