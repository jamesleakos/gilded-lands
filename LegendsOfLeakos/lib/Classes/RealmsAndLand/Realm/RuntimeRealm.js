"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeBiome_1 = __importDefault(require("../Biome/RuntimeBiome"));
var RuntimeLandTile_1 = __importDefault(require("../LandTile/RuntimeLandTile"));
var RuntimeRealm = /** @class */ (function () {
    function RuntimeRealm() {
        this.name = 'New Realm';
        this.biomes = [];
        this.landTiles = [];
        // #endregion
    }
    // #region Landtiles
    RuntimeRealm.prototype.getLandTile = function (id) {
        var landTile = this.landTiles.find(function (x) { return x.id === id; });
        if (!landTile) {
            throw new Error('Landtile not found with id ' +
                id +
                ' in realm with landtiles ' +
                this.landTiles.map(function (x) { return x.id; }));
        }
        return landTile;
    };
    RuntimeRealm.prototype.exploreLandTile = function (id) {
        var landTile = this.getLandTile(id);
        landTile.explore();
    };
    RuntimeRealm.prototype.landtileIsNeighborOfExploredTile = function (landtileID) {
        var landTile = this.getLandTile(landtileID);
        var neighbors = landTile.findNeighbors(this.landTiles);
        return neighbors.some(function (x) { return x.explored; });
    };
    // #endregion
    // #region JSON and registration
    RuntimeRealm.prototype.toJSONFullCopy = function () {
        return {
            name: this.name,
            biomes: this.biomes.map(function (biome) { return biome.toJSONFullCopy(); }),
            landTiles: this.landTiles.map(function (landTile) { return landTile.toJSON(); }),
        };
    };
    RuntimeRealm.prototype.toJSONForOpponent = function () {
        return {
            name: this.name,
            biomes: this.biomes.map(function (biome) { return biome.toJSONForOpponent(); }),
            landTiles: this.landTiles.map(function (landTile) { return landTile.toJSON(); }),
        };
    };
    RuntimeRealm.prototype.clone = function () {
        return RuntimeRealm.fromRuntimeJSON(this.toJSONFullCopy());
    };
    RuntimeRealm.fromRuntimeJSON = function (json) {
        var realm = new RuntimeRealm();
        realm.name = json.name;
        realm.biomes = json.biomes.map(function (biome) {
            return RuntimeBiome_1.default.fromRuntimeJSON(biome);
        });
        realm.landTiles = json.landTiles.map(function (landTile) {
            return RuntimeLandTile_1.default.fromJSON(landTile);
        });
        return realm;
    };
    RuntimeRealm.registerRealmAndAddCardsToDeck = function (libraryRealm, deck, player, cardLibrary, realmLayout) {
        if (!libraryRealm ||
            !libraryRealm.biomes ||
            libraryRealm.biomes.length === 0) {
            throw new Error('bad library realm');
        }
        var realm = new RuntimeRealm();
        realm.name = libraryRealm.name;
        // it's not as simple as converting just the biomes
        // RuntimeBiomes don't nest other biomes, but LibraryBiomes do
        // first, we need to get all of the landtiles - landtiles can be shared by different biomes
        var landtiles = [];
        for (var _i = 0, _a = libraryRealm.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            landtiles.push.apply(landtiles, RuntimeBiome_1.default.createRuntimeLandtilesFromLibraryBiome(biome));
        }
        // filter out duplicate ids - this is important so that biomes will share the same landtiles
        landtiles.filter(function (landTile, index, self) {
            return self.findIndex(function (x) { return x.id === landTile.id; }) === index;
        });
        // sort by id
        landtiles.sort(function (a, b) { return a.id - b.id; });
        realm.landTiles = landtiles;
        // then, we can add these landtiles to the biomes, add the biomes to the realm, and get the deck
        realm.biomes = RuntimeBiome_1.default.registerBiomeAndAddCardsToDeck(libraryRealm.biomes, realm.landTiles, deck, player, cardLibrary);
        // Set Land and ecosystem
        RuntimeLandTile_1.default.assignCoords(realm.landTiles, realmLayout);
        RuntimeLandTile_1.default.assignDepth(realm.landTiles);
        return realm;
    };
    return RuntimeRealm;
}());
exports.default = RuntimeRealm;
