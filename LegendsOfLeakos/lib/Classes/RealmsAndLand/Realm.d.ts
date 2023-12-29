import { Biome } from './Biome';
import { LandTile } from './LandTile';
export declare class Realm {
    name: string;
    biomes: Biome[];
    getNumCards(): number;
    deleteAllCards(): void;
    getTerrain(): LandTile[];
    isRealmValid(): boolean;
    static copyRealm(oldRealm: Realm): Realm;
}
