"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeCard_1 = __importDefault(require("../../Card/RuntimeCard"));
var RuntimeLandTile_1 = __importDefault(require("../LandTile/RuntimeLandTile"));
var LandAndBiome_1 = require("../../../Enums/LandAndBiome");
/**
 * The RuntimeBiome has one main purpose. During the game, it provides the relationship between
 * the RuntimeCards (the acutal instances of which reside in the playerInfo's RuntimeZones),
 * and the landTiles. Therefore, if a landTile is explored, the cards in the biome can be drawn */
var RuntimeBiome = /** @class */ (function () {
    function RuntimeBiome() {
    }
    RuntimeBiome.prototype.toJSONFullCopy = function () {
        return {
            biomeType: LandAndBiome_1.BiomeType[this.biomeType],
            biomeDepth: LandAndBiome_1.BiomeDepth[this.biomeDepth],
            cardInstanceIds: this.cardInstanceIds,
            landTileIds: this.landTileIds,
        };
    };
    RuntimeBiome.prototype.toJSONForOpponent = function () {
        return {
            biomeType: LandAndBiome_1.BiomeType[this.biomeType],
            biomeDepth: LandAndBiome_1.BiomeDepth[this.biomeDepth],
            cardInstanceIds: [],
            landTileIds: this.landTileIds,
        };
    };
    RuntimeBiome.fromRuntimeJSON = function (json) {
        try {
            var biome = new RuntimeBiome();
            biome.biomeType = LandAndBiome_1.BiomeType[json.biomeType];
            biome.biomeDepth = LandAndBiome_1.BiomeDepth[json.biomeDepth];
            biome.cardInstanceIds = json.cardInstanceIds.map(function (id) { return id; });
            biome.landTileIds = json.landTileIds.map(function (id) { return id; });
            return biome;
        }
        catch (error) {
            console.log('Error in RuntimeBiome.fromRuntimeJSON');
            console.log(error);
            console.log(json);
            return null;
        }
    };
    RuntimeBiome.createRuntimeLandtilesFromLibraryBiome = function (libraryBiome) {
        if (!libraryBiome) {
            throw new Error('LibraryBiome not created successfully');
        }
        var landTiles = [];
        for (var _i = 0, _a = libraryBiome.landTiles; _i < _a.length; _i++) {
            var libraryLandTile = _a[_i];
            var landTile = RuntimeLandTile_1.default.fromJSON(libraryLandTile.toJSON());
            landTiles.push(landTile);
        }
        for (var _b = 0, _c = libraryBiome.subBiomes; _b < _c.length; _b++) {
            var subBiome = _c[_b];
            var subLandtiles = RuntimeBiome.createRuntimeLandtilesFromLibraryBiome(subBiome);
            landTiles.push.apply(landTiles, subLandtiles);
        }
        // return unique landtiles
        return landTiles.filter(function (landTile, index, self) {
            return self.findIndex(function (x) { return x.id === landTile.id; }) === index;
        });
    };
    RuntimeBiome.registerBiomeAndAddCardsToDeck = function (libraryBiomes, allLandtiles, deck, player, cardLibrary) {
        var biomes = [];
        var _loop_1 = function (libraryBiome) {
            var biome = new RuntimeBiome();
            biome.biomeType = libraryBiome.biomeType;
            biome.biomeDepth = libraryBiome.biomeDepth;
            // add the cards
            biome.cardInstanceIds = [];
            // for each entry in the library biome (libID plus amount), add that number to the deck
            libraryBiome.cards.forEach(function (libEntry) {
                var _a, _b;
                var cards = RuntimeCard_1.default.cardsFromLibraryCardEntry(libEntry, deck, player, cardLibrary);
                // add to deck
                (_a = deck.cards).push.apply(_a, cards);
                // add IDs to biome
                (_b = biome.cardInstanceIds).push.apply(_b, cards.map(function (c) { return c.instanceId; }));
            });
            // add the landtileIds
            biome.landTileIds = libraryBiome.landTiles.map(function (lt) { return lt.id; });
            // add the biome to biomes and get the subbiomes
            biomes.push(biome);
            var subBiomes = RuntimeBiome.registerBiomeAndAddCardsToDeck(libraryBiome.subBiomes, allLandtiles, deck, player, cardLibrary);
            biomes.push.apply(biomes, subBiomes);
        };
        for (var _i = 0, libraryBiomes_1 = libraryBiomes; _i < libraryBiomes_1.length; _i++) {
            var libraryBiome = libraryBiomes_1[_i];
            _loop_1(libraryBiome);
        }
        return biomes;
    };
    return RuntimeBiome;
}());
exports.default = RuntimeBiome;
