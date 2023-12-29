import LibraryCard from '../../Card/LibraryCard';
import PlayerInfo from '../../Player/PlayerInfo';
import RuntimeZone from '../../Zone/RuntimeZone';
import RuntimeBiome from '../Biome/RuntimeBiome';
import RuntimeLandTile from '../LandTile/RuntimeLandTile';
import LibraryRealm from './LibraryRealm';
declare class RuntimeRealm {
    name: string;
    biomes: RuntimeBiome[];
    landTiles: RuntimeLandTile[];
    getLandTile(id: number): RuntimeLandTile;
    exploreLandTile(id: number): void;
    landtileIsNeighborOfExploredTile(landtileID: number): boolean;
    toJSONFullCopy(): any;
    toJSONForOpponent(): any;
    clone(): RuntimeRealm;
    static fromRuntimeJSON(json: any): RuntimeRealm;
    static registerRealmAndAddCardsToDeck(libraryRealm: LibraryRealm, deck: RuntimeZone, player: PlayerInfo, cardLibrary: LibraryCard[], realmLayout: any): RuntimeRealm;
}
export default RuntimeRealm;
