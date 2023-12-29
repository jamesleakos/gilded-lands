import { LandType } from '../../../Enums/LandAndBiome';
import BaseLandTile from './BaseLandTile';

class LibraryLandTile extends BaseLandTile {
  //#region JSON

  toJSON() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      z: this.z,
      depth: this.depth,
      // store as a string
      landType: LandType[this.landType],
    };
  }

  static fromJSON = (json: any): LibraryLandTile => {
    const tile = new LibraryLandTile(
      json.id,
      LandType[json.landType as keyof typeof LandType]
    );
    tile.x = json.x;
    tile.y = json.y;
    tile.z = json.z;
    tile.depth = json.depth;

    return tile;
  };

  //#endregion

  //#region OTHER UTILITIES
  mostCommonNeighborType(allLandTiles: LibraryLandTile[]) {
    const typeCounts: { [key: string]: any } = {};
    for (let neighbor of this.findNeighbors(allLandTiles)) {
      if (neighbor.landType in typeCounts) {
        typeCounts[neighbor.landType] += 1;
      } else {
        typeCounts[neighbor.landType] = 1;
      }
    }
    let mostCommonType = 0;
    let mostCommonCount = 0;

    for (let type in typeCounts) {
      if (typeCounts[type] > mostCommonCount) {
        mostCommonType = parseInt(type);
        mostCommonCount = typeCounts[type];
      }
    }
    return mostCommonType;
  }
}

export default LibraryLandTile;
