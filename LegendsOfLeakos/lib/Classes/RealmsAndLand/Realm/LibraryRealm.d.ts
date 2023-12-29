import LibraryBiome from '../Biome/LibraryBiome';
import LibraryLandTile from '../LandTile/LibraryLandTile';
import { BiomeType, LandType } from '../../../Enums/LandAndBiome';
import GameManager from '../../Game/GameManager';
import LibraryCardEntry from '../Biome/LibraryCardEntry';
declare class LibraryRealm {
    name: string;
    biomes: LibraryBiome[];
    getNumCards(): number;
    deleteAllCards(): void;
    getAllCards(): LibraryCardEntry[];
    getLandTiles(): LibraryLandTile[];
    changeLandTileType(tile_id: number, newLandType: LandType): void;
    isRealmValid(gameManager: GameManager): boolean;
    static copyRealm(oldRealm: LibraryRealm): LibraryRealm;
    initalizeLandTiles(realmLayout?: any): void;
    updateRealm(): void;
    static getLandTileCountInCommon(oldBiome: LibraryBiome, newBiome: LibraryBiome): number;
    static biomeAdder(landTile: LibraryLandTile, allLandtiles: LibraryLandTile[], biomeType: BiomeType, tempBiomes: LibraryBiome[]): void;
    static recursiveTileAdder(landTile: LibraryLandTile, allLandtiles: LibraryLandTile[], tempBiome: LibraryBiome): void;
    static fromJSON(json: any): LibraryRealm;
    toJSON(): any;
}
export default LibraryRealm;
