"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Realm = void 0;
var Biome_1 = require("./Biome");
var Realm = /** @class */ (function () {
    function Realm() {
        this.name = "New EcoSystem";
        this.biomes = [];
    }
    Realm.prototype.getNumCards = function () {
        var count = 0;
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            count += biome.getAllCardsCount();
        }
        return count;
    };
    Realm.prototype.deleteAllCards = function () {
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            biome.deleteAllCards();
        }
    };
    Realm.prototype.getTerrain = function () {
        var tiles = [];
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            tiles.push.apply(tiles, biome.terrain.landTiles);
        }
        return tiles.sort(function (a, b) { return a.id - b.id; });
    };
    Realm.prototype.isRealmValid = function () {
        for (var _i = 0, _a = this.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            if (!biome.areBiomeAndSubsValid().isValid) {
                return false;
            }
        }
        return true;
    };
    Realm.copyRealm = function (oldRealm) {
        var newRealm = new Realm();
        newRealm.name = oldRealm.name;
        for (var _i = 0, _a = oldRealm.biomes; _i < _a.length; _i++) {
            var old = _a[_i];
            newRealm.biomes.push(Biome_1.Biome.copyBiome(old));
        }
        return newRealm;
    };
    return Realm;
}());
exports.Realm = Realm;
