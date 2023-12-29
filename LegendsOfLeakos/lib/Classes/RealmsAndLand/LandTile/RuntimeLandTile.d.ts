import BaseLandTile from './BaseLandTile';
declare class RuntimeLandTile extends BaseLandTile {
    get explored(): boolean;
    protected set explored(value: boolean);
    private _explored;
    /**
     * I put this in place to remind me that exploring should really only be done by the
     * runtime realm, as there will be copies of landtiles across the biomes
     */
    explore(set?: boolean): void;
    anyNeighborExplored(allLandTiles: RuntimeLandTile[]): boolean;
    toJSON(): any;
    static fromJSON(json: any): RuntimeLandTile;
}
export default RuntimeLandTile;
