import { LandType } from '../../Enums/LandAndBiome';
declare class RuntimeLandTile {
    id: number;
    x: number;
    y: number;
    z: number;
    landType: LandType;
    depth: number;
    explored: boolean;
    neighbors: RuntimeLandTile[];
    onDepthChanged: ((newDepth: number) => void)[];
    onTypeChanged: ((setType: number) => void)[];
    onExploredChanged: ((setExplored: boolean) => void)[];
    findNeighbors(landTiles: RuntimeLandTile[]): void;
    setDepth(newDepth: number): void;
    explore(setExplored: boolean): void;
    changeType(setType: number): void;
    getNeighborNumber(neighbor: number): RuntimeLandTile | null;
    anyNeighborExplored(): boolean;
    static assignNeighbors(landTiles: RuntimeLandTile[]): void;
    static assignDepth(landTiles: RuntimeLandTile[]): void;
    static assignCoords(landTiles: RuntimeLandTile[], realmLayout: number[]): void;
}
export default RuntimeLandTile;
