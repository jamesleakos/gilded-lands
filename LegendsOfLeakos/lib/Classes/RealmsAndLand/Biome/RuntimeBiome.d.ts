import RuntimeLandTile from '../LandTile/RuntimeLandTile';
import { BiomeDepth, BiomeType } from '../../../Enums/LandAndBiome';
import RuntimeZone from '../../Zone/RuntimeZone';
import PlayerInfo from '../../Player/PlayerInfo';
import LibraryCard from '../../Card/LibraryCard';
import LibraryBiome from './LibraryBiome';
/**
 * The RuntimeBiome has one main purpose. During the game, it provides the relationship between
 * the RuntimeCards (the acutal instances of which reside in the playerInfo's RuntimeZones),
 * and the landTiles. Therefore, if a landTile is explored, the cards in the biome can be drawn */
declare class RuntimeBiome {
    biomeType: BiomeType;
    biomeDepth: BiomeDepth;
    cardInstanceIds: number[];
    landTileIds: number[];
    toJSONFullCopy(): any;
    toJSONForOpponent(): any;
    static fromRuntimeJSON(json: any): RuntimeBiome;
    static createRuntimeLandtilesFromLibraryBiome(libraryBiome: LibraryBiome): RuntimeLandTile[];
    static registerBiomeAndAddCardsToDeck(libraryBiomes: LibraryBiome[], allLandtiles: RuntimeLandTile[], deck: RuntimeZone, player: PlayerInfo, cardLibrary: LibraryCard[]): RuntimeBiome[];
}
export default RuntimeBiome;
