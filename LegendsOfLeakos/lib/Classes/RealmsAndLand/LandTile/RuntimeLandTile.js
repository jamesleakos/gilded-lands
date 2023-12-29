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
var BaseLandTile_1 = __importDefault(require("./BaseLandTile"));
var LandAndBiome_1 = require("../../../Enums/LandAndBiome");
var RuntimeLandTile = /** @class */ (function (_super) {
    __extends(RuntimeLandTile, _super);
    function RuntimeLandTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RuntimeLandTile.prototype, "explored", {
        get: function () {
            return this._explored;
        },
        set: function (value) {
            this._explored = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * I put this in place to remind me that exploring should really only be done by the
     * runtime realm, as there will be copies of landtiles across the biomes
     */
    RuntimeLandTile.prototype.explore = function (set) {
        if (set === void 0) { set = true; }
        this.explored = set;
    };
    RuntimeLandTile.prototype.anyNeighborExplored = function (allLandTiles) {
        var neighbors = this.findNeighbors(allLandTiles);
        return neighbors.some(function (neighbor) { return neighbor.explored; });
    };
    RuntimeLandTile.prototype.toJSON = function () {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            z: this.z,
            // as string of enum
            landType: LandAndBiome_1.LandType[this.landType],
            depth: this.depth,
            explored: this.explored,
        };
    };
    RuntimeLandTile.fromJSON = function (json) {
        var tile = new RuntimeLandTile(json.id, LandAndBiome_1.LandType[json.landType]);
        tile.x = json.x;
        tile.y = json.y;
        tile.z = json.z;
        tile.depth = json.depth;
        tile.explored = json.explored !== undefined ? json.explored : false;
        return tile;
    };
    return RuntimeLandTile;
}(BaseLandTile_1.default));
exports.default = RuntimeLandTile;
