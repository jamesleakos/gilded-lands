// import LandType enum from Enums
import { LandType } from '../../../Enums/LandAndBiome';

class BaseLandTile {
  public id: number;
  public x: number;
  public y: number;
  public z: number;
  public landType: LandType;
  public depth: number;

  constructor(id: number, landType: LandType) {
    this.id = id;
    this.landType = landType;
  }

  // neighbors
  findNeighbors(landTiles: BaseLandTile[]): BaseLandTile[] {
    const directions = [
      { dx: 0, dy: 1, dz: -1 },
      { dx: 0, dy: -1, dz: 1 },
      { dx: 1, dy: 0, dz: -1 },
      { dx: -1, dy: 0, dz: 1 },
      { dx: -1, dy: 1, dz: 0 },
      { dx: 1, dy: -1, dz: 0 },
    ];

    return directions
      .map(({ dx, dy, dz }) =>
        landTiles.find(
          (tile) =>
            tile.x === this.x + dx &&
            tile.y === this.y + dy &&
            tile.z === this.z + dz
        )
      )
      .filter((tile) => tile !== undefined);
  }

  getNeighborByPosition(
    position: number,
    landTiles: BaseLandTile[]
  ): BaseLandTile | null {
    const directions = [
      { dx: 1, dy: 0, dz: -1 },
      { dx: 1, dy: -1, dz: 0 },
      { dx: 0, dy: -1, dz: 1 },
      { dx: -1, dy: 0, dz: 1 },
      { dx: -1, dy: 1, dz: 0 },
      { dx: 0, dy: 1, dz: -1 },
    ];

    if (position < 1 || position > 6) return null;

    const neighbors = this.findNeighbors(landTiles);

    const { dx, dy, dz } = directions[position - 1];
    return (
      neighbors.find(
        (tile) =>
          tile.x === this.x + dx &&
          tile.y === this.y + dy &&
          tile.z === this.z + dz
      ) || null
    );
  }

  // static

  static assignDepth(landTiles: BaseLandTile[]): void {
    landTiles.forEach((landTile) => {
      const neighbors = landTile.findNeighbors(landTiles);
      landTile.depth = 2;
      for (const neighbor of neighbors) {
        if (neighbor.landType !== landTile.landType) {
          landTile.depth = 1;
          break;
        }
      }
    });

    let stillSearching = true;
    let depth = 1;
    while (stillSearching) {
      depth = depth + 1;
      if (depth > 20) {
        throw new Error(
          'assignDepth() failed to complete - landtiles: ' +
            JSON.stringify(landTiles)
        );
      }

      stillSearching = false;
      landTiles.forEach((landTile) => {
        const neighbors = landTile.findNeighbors(landTiles);
        if (landTile.depth === depth) {
          let increase = true;
          neighbors.forEach((neighbor) => {
            if (neighbor.depth < depth) {
              increase = false;
            }
          });
          if (increase) {
            landTile.depth++;
            stillSearching = true;
          }
        }
      });
    }
  }

  static assignCoords(landTiles: BaseLandTile[], realmLayout: number[]): void {
    let tileCounter = 0;
    for (let row = 0; row < realmLayout.length; row++) {
      landTiles[tileCounter].z = row - Math.floor(realmLayout.length / 2);
      landTiles[tileCounter].x = Math.floor(
        -0.5 * landTiles[tileCounter].z - (0.5 * realmLayout[row] - 0.5)
      );
      landTiles[tileCounter].y = -(
        landTiles[tileCounter].x + landTiles[tileCounter].z
      );

      let tempX = landTiles[tileCounter].x;
      let tempY = landTiles[tileCounter].y;
      let tempZ = landTiles[tileCounter].z;

      tileCounter = tileCounter + 1;

      for (let col = 1; col < realmLayout[row]; col++) {
        landTiles[tileCounter].x = tempX + col;
        landTiles[tileCounter].y = tempY - col;
        landTiles[tileCounter].z = tempZ;

        tileCounter = tileCounter + 1;
      }
    }
  }
}

export default BaseLandTile;
