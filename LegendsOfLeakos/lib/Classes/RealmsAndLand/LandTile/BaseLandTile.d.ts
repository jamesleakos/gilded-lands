import { LandType } from '../../../Enums/LandAndBiome';
declare class BaseLandTile {
    id: number;
    x: number;
    y: number;
    z: number;
    landType: LandType;
    depth: number;
    constructor(id: number, landType: LandType);
    findNeighbors(landTiles: BaseLandTile[]): BaseLandTile[];
    getNeighborByPosition(position: number, landTiles: BaseLandTile[]): BaseLandTile | null;
    static assignDepth(landTiles: BaseLandTile[]): void;
    static assignCoords(landTiles: BaseLandTile[], realmLayout: number[]): void;
}
export default BaseLandTile;
