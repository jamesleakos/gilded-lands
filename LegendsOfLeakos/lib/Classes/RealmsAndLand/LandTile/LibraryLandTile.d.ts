import BaseLandTile from './BaseLandTile';
declare class LibraryLandTile extends BaseLandTile {
    toJSON(): {
        id: number;
        x: number;
        y: number;
        z: number;
        depth: number;
        landType: string;
    };
    static fromJSON: (json: any) => LibraryLandTile;
    mostCommonNeighborType(allLandTiles: LibraryLandTile[]): number;
}
export default LibraryLandTile;
