import BaseLandTile from './BaseLandTile';
import { LandType } from '../../../Enums/LandAndBiome';

class RuntimeLandTile extends BaseLandTile {
  public get explored(): boolean {
    return this._explored;
  }

  protected set explored(value: boolean) {
    this._explored = value;
  }

  private _explored: boolean;

  /**
   * I put this in place to remind me that exploring should really only be done by the
   * runtime realm, as there will be copies of landtiles across the biomes
   */
  explore(set: boolean = true): void {
    this.explored = set;
  }

  anyNeighborExplored(allLandTiles: RuntimeLandTile[]): boolean {
    const neighbors = this.findNeighbors(allLandTiles);
    return (neighbors as RuntimeLandTile[]).some(
      (neighbor) => neighbor.explored
    );
  }

  toJSON(): any {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      z: this.z,
      // as string of enum
      landType: LandType[this.landType],
      depth: this.depth,
      explored: this.explored,
    };
  }

  static fromJSON(json: any): RuntimeLandTile {
    const tile = new RuntimeLandTile(
      json.id,
      LandType[json.landType as keyof typeof LandType]
    );
    tile.x = json.x;
    tile.y = json.y;
    tile.z = json.z;
    tile.depth = json.depth;
    tile.explored = json.explored !== undefined ? json.explored : false;
    return tile;
  }
}

export default RuntimeLandTile;
