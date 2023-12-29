"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LandAndBiome_1 = require("../../../Enums/LandAndBiome");
var BaseLandTile_1 = __importDefault(require("./BaseLandTile"));
var LibraryLandTile = /** @class */ (function (_super) {
    __extends(LibraryLandTile, _super);
    function LibraryLandTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //#region JSON
    LibraryLandTile.prototype.toJSON = function () {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            z: this.z,
            depth: this.depth,
            // store as a string
            landType: LandAndBiome_1.LandType[this.landType],
        };
    };
    //#endregion
    //#region OTHER UTILITIES
    LibraryLandTile.prototype.mostCommonNeighborType = function (allLandTiles) {
        var typeCounts = {};
        for (var _i = 0, _a = this.findNeighbors(allLandTiles); _i < _a.length; _i++) {
            var neighbor = _a[_i];
            if (neighbor.landType in typeCounts) {
                typeCounts[neighbor.landType] += 1;
            }
            else {
                typeCounts[neighbor.landType] = 1;
            }
        }
        var mostCommonType = 0;
        var mostCommonCount = 0;
        for (var type in typeCounts) {
            if (typeCounts[type] > mostCommonCount) {
                mostCommonType = parseInt(type);
                mostCommonCount = typeCounts[type];
            }
        }
        return mostCommonType;
    };
    LibraryLandTile.fromJSON = function (json) {
        var tile = new LibraryLandTile(json.id, LandAndBiome_1.LandType[json.landType]);
        tile.x = json.x;
        tile.y = json.y;
        tile.z = json.z;
        tile.depth = json.depth;
        return tile;
    };
    return LibraryLandTile;
}(BaseLandTile_1.default));
exports.default = LibraryLandTile;
