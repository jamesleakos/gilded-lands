"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseLandTile = /** @class */ (function () {
    function BaseLandTile(id, landType) {
        this.id = id;
        this.landType = landType;
    }
    // neighbors
    BaseLandTile.prototype.findNeighbors = function (landTiles) {
        var _this = this;
        var directions = [
            { dx: 0, dy: 1, dz: -1 },
            { dx: 0, dy: -1, dz: 1 },
            { dx: 1, dy: 0, dz: -1 },
            { dx: -1, dy: 0, dz: 1 },
            { dx: -1, dy: 1, dz: 0 },
            { dx: 1, dy: -1, dz: 0 },
        ];
        return directions
            .map(function (_a) {
            var dx = _a.dx, dy = _a.dy, dz = _a.dz;
            return landTiles.find(function (tile) {
                return tile.x === _this.x + dx &&
                    tile.y === _this.y + dy &&
                    tile.z === _this.z + dz;
            });
        })
            .filter(function (tile) { return tile !== undefined; });
    };
    BaseLandTile.prototype.getNeighborByPosition = function (position, landTiles) {
        var _this = this;
        var directions = [
            { dx: 1, dy: 0, dz: -1 },
            { dx: 1, dy: -1, dz: 0 },
            { dx: 0, dy: -1, dz: 1 },
            { dx: -1, dy: 0, dz: 1 },
            { dx: -1, dy: 1, dz: 0 },
            { dx: 0, dy: 1, dz: -1 },
        ];
        if (position < 1 || position > 6)
            return null;
        var neighbors = this.findNeighbors(landTiles);
        var _a = directions[position - 1], dx = _a.dx, dy = _a.dy, dz = _a.dz;
        return (neighbors.find(function (tile) {
            return tile.x === _this.x + dx &&
                tile.y === _this.y + dy &&
                tile.z === _this.z + dz;
        }) || null);
    };
    // static
    BaseLandTile.assignDepth = function (landTiles) {
        landTiles.forEach(function (landTile) {
            var neighbors = landTile.findNeighbors(landTiles);
            landTile.depth = 2;
            for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
                var neighbor = neighbors_1[_i];
                if (neighbor.landType !== landTile.landType) {
                    landTile.depth = 1;
                    break;
                }
            }
        });
        var stillSearching = true;
        var depth = 1;
        while (stillSearching) {
            depth = depth + 1;
            if (depth > 20) {
                throw new Error('assignDepth() failed to complete - landtiles: ' +
                    JSON.stringify(landTiles));
            }
            stillSearching = false;
            landTiles.forEach(function (landTile) {
                var neighbors = landTile.findNeighbors(landTiles);
                if (landTile.depth === depth) {
                    var increase_1 = true;
                    neighbors.forEach(function (neighbor) {
                        if (neighbor.depth < depth) {
                            increase_1 = false;
                        }
                    });
                    if (increase_1) {
                        landTile.depth++;
                        stillSearching = true;
                    }
                }
            });
        }
    };
    BaseLandTile.assignCoords = function (landTiles, realmLayout) {
        var tileCounter = 0;
        for (var row = 0; row < realmLayout.length; row++) {
            landTiles[tileCounter].z = row - Math.floor(realmLayout.length / 2);
            landTiles[tileCounter].x = Math.floor(-0.5 * landTiles[tileCounter].z - (0.5 * realmLayout[row] - 0.5));
            landTiles[tileCounter].y = -(landTiles[tileCounter].x + landTiles[tileCounter].z);
            var tempX = landTiles[tileCounter].x;
            var tempY = landTiles[tileCounter].y;
            var tempZ = landTiles[tileCounter].z;
            tileCounter = tileCounter + 1;
            for (var col = 1; col < realmLayout[row]; col++) {
                landTiles[tileCounter].x = tempX + col;
                landTiles[tileCounter].y = tempY - col;
                landTiles[tileCounter].z = tempZ;
                tileCounter = tileCounter + 1;
            }
        }
    };
    return BaseLandTile;
}());
exports.default = BaseLandTile;
