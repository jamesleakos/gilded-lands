"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryBiome_1 = __importDefault(require("../Biome/LibraryBiome"));
var LibraryLandTile_1 = __importDefault(require("../LandTile/LibraryLandTile"));
// enums
var LandAndBiome_1 = require("../../../Enums/LandAndBiome");
var GameProperties_1 = __importDefault(require("../../Game/GameProperties"));
var LibraryRealm = /** @class */ (function () {
    function LibraryRealm() {
        this.name = 'New Realm';
        this.biomes = [];
        // #endregion
    }
    // #region Simple Card Utilities
    LibraryRealm.prototype.getNumCards = function () {
        var count = 0;
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            count += biome.getCardsCount();
        }
        return count;
    };
    LibraryRealm.prototype.deleteAllCards = function () {
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            biome.deleteAllCards();
        }
    };
    LibraryRealm.prototype.getAllCards = function () {
        var cards = [];
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            cards.push.apply(cards, biome.getAllCardsInBiomeAndSubbiomes());
        }
        return cards;
    };
    // #endregion
    // #region Land Tiles
    LibraryRealm.prototype.getLandTiles = function () {
        var tiles = [];
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            tiles.push.apply(tiles, biome.getLandTiles());
        }
        return tiles.sort(function (a, b) { return a.id - b.id; });
    };
    LibraryRealm.prototype.changeLandTileType = function (tile_id, newLandType) {
        var tiles = this.getLandTiles();
        // get the tile we want to change
        var tile = tiles.find(function (c) { return c.id === tile_id; });
        if (tile === undefined) {
            console.log('Error, tile not found');
            return;
        }
        tile.landType = newLandType;
        this.initalizeLandTiles(GameProperties_1.default.realmLayout);
        // TODO: update realm
        this.updateRealm();
    };
    // #endregion
    // #region Realm Utilities
    LibraryRealm.prototype.isRealmValid = function (gameManager) {
        // REALM STUFF
        // make sure there's exactly one city
        var cities = this.getLandTiles().filter(function (c) { return c.landType === LandAndBiome_1.LandType.city; });
        if (cities.length !== 1) {
            console.log('Error, not exactly one city');
            return false;
        }
        // re-assign the coordinates, in case there's something funky happening
        this.initalizeLandTiles();
        // make sure that there are the right amount of land tiles
        var landTiles = this.getLandTiles();
        var layoutSum = GameProperties_1.default.realmLayout.reduce(function (a, b) { return a + b; }, 0);
        if (landTiles.length !== layoutSum) {
            console.log('Error, tiles dont match');
            return false;
        }
        // just try to init the tiles
        try {
            this.initalizeLandTiles();
        }
        catch (_a) {
            console.log('Error, couldnt init tiles');
            return false;
        }
        // BIOME STUFF
        // make sure all biomes are valid
        for (var _i = 0, _b = this.biomes; _i < _b.length; _i++) {
            var biome = _b[_i];
            if (!biome.areBiomeAndSubsValid(gameManager)) {
                console.log('Error, biome not valid');
                return false;
            }
        }
        return true;
    };
    LibraryRealm.copyRealm = function (oldRealm) {
        var newRealm = new LibraryRealm();
        newRealm.name = oldRealm.name;
        for (var _i = 0, _a = oldRealm.biomes; _i < _a.length; _i++) {
            var old = _a[_i];
            newRealm.biomes.push(LibraryBiome_1.default.copyBiome(old));
        }
        newRealm.initalizeLandTiles();
        return newRealm;
    };
    // #endregion
    // #region Updating Landtiles and Cards
    LibraryRealm.prototype.initalizeLandTiles = function (realmLayout) {
        if (realmLayout === void 0) { realmLayout = [7, 10, 11, 12, 11, 12, 11, 10, 7]; }
        var tiles = this.getLandTiles();
        LibraryLandTile_1.default.assignCoords(tiles, realmLayout);
        LibraryLandTile_1.default.assignDepth(tiles);
    };
    LibraryRealm.prototype.updateRealm = function () {
        var newBiomes = [];
        var landTypeBiomeTypePairs = [
            [LandAndBiome_1.LandType.forest, LandAndBiome_1.BiomeType.forest],
            [LandAndBiome_1.LandType.ocean, LandAndBiome_1.BiomeType.ocean],
            [LandAndBiome_1.LandType.desert, LandAndBiome_1.BiomeType.desert],
            [LandAndBiome_1.LandType.mountain, LandAndBiome_1.BiomeType.mountain],
            [LandAndBiome_1.LandType.prairie, LandAndBiome_1.BiomeType.prairie],
            [LandAndBiome_1.LandType.fells, LandAndBiome_1.BiomeType.fells],
            [LandAndBiome_1.LandType.tundra, LandAndBiome_1.BiomeType.tundra],
            [LandAndBiome_1.LandType.city, LandAndBiome_1.BiomeType.city],
        ];
        // add the land tiles to the the new biomes
        var landTiles = this.getLandTiles();
        for (var _i = 0, landTypeBiomeTypePairs_1 = landTypeBiomeTypePairs; _i < landTypeBiomeTypePairs_1.length; _i++) {
            var _a = landTypeBiomeTypePairs_1[_i], landType = _a[0], biomeType = _a[1];
            for (var _b = 0, landTiles_1 = landTiles; _b < landTiles_1.length; _b++) {
                var landTile = landTiles_1[_b];
                if (landTile.landType === landType) {
                    LibraryRealm.biomeAdder(landTile, landTiles, biomeType, newBiomes);
                }
            }
        }
        var _loop_1 = function (newBiome) {
            // get list of old biomes that are the same type
            var oldBiomes = this_1.biomes.filter(function (c) { return c.biomeType === newBiome.biomeType; });
            // get the old biome that has the most land tiles in common
            var bestOldBiome = undefined;
            var bestCount = 0;
            for (var _d = 0, oldBiomes_1 = oldBiomes; _d < oldBiomes_1.length; _d++) {
                var oldBiome = oldBiomes_1[_d];
                var count = LibraryRealm.getLandTileCountInCommon(oldBiome, newBiome);
                if (count > bestCount) {
                    bestOldBiome = oldBiome;
                    bestCount = count;
                }
            }
            // if we found a best old biome, add cards from it to the new biome
            if (bestOldBiome !== undefined) {
                LibraryBiome_1.default.copyAllCardsBetweenBiomes(bestOldBiome, newBiome);
            }
        };
        var this_1 = this;
        // new biome identifies most likely precursor from old biome based on boimeType
        // and number of land tiles in common
        // and then adds cards from old biome to new biome, if allowed
        for (var _c = 0, newBiomes_1 = newBiomes; _c < newBiomes_1.length; _c++) {
            var newBiome = newBiomes_1[_c];
            _loop_1(newBiome);
        }
        this.biomes = newBiomes;
    };
    LibraryRealm.getLandTileCountInCommon = function (oldBiome, newBiome) {
        var count = 0;
        for (var _i = 0, _a = oldBiome.landTiles; _i < _a.length; _i++) {
            var oldTile = _a[_i];
            for (var _b = 0, _c = newBiome.landTiles; _b < _c.length; _b++) {
                var newTile = _c[_b];
                if (oldTile.id === newTile.id) {
                    count++;
                }
            }
        }
        return count;
    };
    LibraryRealm.biomeAdder = function (landTile, allLandtiles, biomeType, tempBiomes) {
        var biomes = tempBiomes.filter(function (c) { return c.biomeType === biomeType; });
        var found = false;
        for (var _i = 0, biomes_1 = biomes; _i < biomes_1.length; _i++) {
            var biome = biomes_1[_i];
            var newSortedTile = biome.landTiles.find(function (c) { return c.id === landTile.id; });
            if (newSortedTile !== undefined) {
                found = true;
            }
        }
        if (!found) {
            var tempBiome = new LibraryBiome_1.default();
            tempBiome.biomeType = biomeType;
            tempBiome.biomeDepth = LandAndBiome_1.BiomeDepth.all;
            tempBiome.cards = [];
            tempBiome.landTiles = [];
            tempBiomes.push(tempBiome);
            LibraryRealm.recursiveTileAdder(landTile, allLandtiles, tempBiome);
            LibraryLandTile_1.default.assignDepth(allLandtiles);
            // And then we add subBiomes
            var shallowBiome = new LibraryBiome_1.default();
            shallowBiome.biomeType = biomeType;
            shallowBiome.biomeDepth = LandAndBiome_1.BiomeDepth.shallow;
            shallowBiome.cards = [];
            shallowBiome.landTiles = [];
            tempBiome.subBiomes.push(shallowBiome);
            var midBiome = new LibraryBiome_1.default();
            midBiome.biomeType = biomeType;
            midBiome.biomeDepth = LandAndBiome_1.BiomeDepth.mid;
            midBiome.cards = [];
            midBiome.landTiles = [];
            tempBiome.subBiomes.push(midBiome);
            var deepBiome = new LibraryBiome_1.default();
            deepBiome.biomeType = biomeType;
            deepBiome.biomeDepth = LandAndBiome_1.BiomeDepth.deep;
            deepBiome.cards = [];
            deepBiome.landTiles = [];
            tempBiome.subBiomes.push(deepBiome);
            for (var _a = 0, _b = tempBiome.landTiles; _a < _b.length; _a++) {
                var lt = _b[_a];
                if (lt.depth === 1) {
                    shallowBiome.landTiles.push(lt);
                }
                else if (lt.depth === 2) {
                    midBiome.landTiles.push(lt);
                }
                else if (lt.depth > 2) {
                    deepBiome.landTiles.push(lt);
                }
                else {
                    console.log('Error, please check this. lt.depth == ' + lt.depth);
                }
            }
            tempBiome.subBiomes = tempBiome.subBiomes.filter(function (c) { return c.landTiles.length > 0; });
        }
    };
    LibraryRealm.recursiveTileAdder = function (landTile, allLandtiles, tempBiome) {
        tempBiome.landTiles.push(landTile);
        var _loop_2 = function (neighbor) {
            if (neighbor.landType === landTile.landType) {
                var sortedTile = tempBiome.landTiles.find(function (c) { return c.id === neighbor.id; });
                if (sortedTile === undefined) {
                    this_2.recursiveTileAdder(neighbor, allLandtiles, tempBiome);
                }
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = landTile.findNeighbors(allLandtiles); _i < _a.length; _i++) {
            var neighbor = _a[_i];
            _loop_2(neighbor);
        }
    };
    // #endregion
    // #region JSON Conversion
    LibraryRealm.fromJSON = function (json) {
        var realm = new LibraryRealm();
        realm.name = json.name;
        realm.biomes = [];
        for (var _i = 0, _a = json.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            realm.biomes.push(LibraryBiome_1.default.fromJSON(biome));
        }
        realm.initalizeLandTiles();
        // should already have depth and coordinates assigned
        return realm;
    };
    LibraryRealm.prototype.toJSON = function () {
        var json = {};
        json.name = this.name;
        json.biomes = [];
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            json.biomes.push(biome.toJSON());
        }
        return json;
    };
    return LibraryRealm;
}());
exports.default = LibraryRealm;
