"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryKeyword_1 = __importDefault(require("../Keyword/LibraryKeyword/LibraryKeyword"));
var RuntimeAbility_1 = __importDefault(require("../Ability/RuntimeAbility"));
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var CardUpgrade_1 = __importDefault(require("./CardUpgrade"));
var DeckRequirement_1 = __importDefault(require("../DeckRequirement/DeckRequirement"));
var LandAndBiome_1 = require("../../Enums/LandAndBiome");
var RuntimeKeyword_1 = __importDefault(require("../Keyword/RuntimeKeyword/RuntimeKeyword"));
var LibraryAbility_1 = __importDefault(require("../Ability/LibraryAbility"));
var LibraryCard = /** @class */ (function () {
    function LibraryCard() {
        // costs
        this.costs = [];
        // reqs
        this.deckRequirements = [];
        // abilities and keywords
        this.keywords = [];
        this.abilities = [];
        // upgrades
        this.cardUpgrades = [];
    }
    LibraryCard.prototype.getCardUpgradeByUpgradeIndex = function (index) {
        return this.cardUpgrades.find(function (c) { return c.upgradeIndex === index; });
    };
    LibraryCard.prototype.clone = function () {
        var json = this.toJSON();
        return LibraryCard.fromJSON(json);
    };
    LibraryCard.prototype.toJSON = function () {
        return {
            libraryId: this.libraryId,
            cardTypeId: this.cardTypeId,
            name: this.name,
            biomeType: LandAndBiome_1.BiomeType[this.biomeType],
            biomeDepth: LandAndBiome_1.BiomeDepth[this.biomeDepth],
            cardText: this.cardText,
            imageName: this.imageName,
            attack: this.attack,
            health: this.health,
            priority: this.priority,
            costs: this.costs.map(function (c) { return c.toJSON(); }),
            deckRequirements: this.deckRequirements.map(function (c) { return c.toJSON(); }),
            keywords: this.keywords.map(function (c) { return c.toJSON(); }),
            abilities: this.abilities.map(function (c) { return c.toJSON(); }),
            cardUpgrades: this.cardUpgrades.map(function (c) { return c.toJSON(); }),
        };
    };
    LibraryCard.fromJSON = function (json) {
        var newCard = new LibraryCard();
        newCard.libraryId = json.libraryId;
        newCard.cardTypeId = json.cardTypeId;
        newCard.name = json.name;
        newCard.biomeType = LandAndBiome_1.BiomeType[json.biomeType];
        newCard.biomeDepth = LandAndBiome_1.BiomeDepth[json.biomeDepth];
        newCard.cardText = json.cardText;
        newCard.imageName = json.imageName;
        newCard.attack = json.attack;
        newCard.health = json.health;
        newCard.priority = json.priority;
        for (var _i = 0, _a = json.costs; _i < _a.length; _i++) {
            var c = _a[_i];
            newCard.costs.push(PayResourceCost_1.default.fromJSON(c));
        }
        for (var _b = 0, _c = json.deckRequirements; _b < _c.length; _b++) {
            var c = _c[_b];
            newCard.deckRequirements.push(DeckRequirement_1.default.fromJSON(c));
        }
        for (var _d = 0, _e = json.keywords; _d < _e.length; _d++) {
            var c = _e[_d];
            newCard.keywords.push(LibraryKeyword_1.default.fromJSON(c));
        }
        for (var _f = 0, _g = json.abilities; _f < _g.length; _f++) {
            var c = _g[_f];
            newCard.abilities.push(LibraryAbility_1.default.fromJSON(c));
        }
        for (var _h = 0, _j = json.cardUpgrades; _h < _j.length; _h++) {
            var c = _j[_h];
            newCard.cardUpgrades.push(CardUpgrade_1.default.fromJSON(c));
        }
        return newCard;
    };
    LibraryCard.isLibraryJSONValid = function (json) {
        if (typeof json.libraryId !== 'number') {
            console.log('Invalid libraryId');
            return false;
        }
        if (typeof json.cardTypeId !== 'number') {
            console.log('Invalid cardTypeId');
            return false;
        }
        if (typeof json.name !== 'string') {
            console.log('Invalid name');
            return false;
        }
        if (typeof json.biomeType !== 'string' ||
            !Object.values(LandAndBiome_1.BiomeType).includes(json.biomeType)) {
            console.log('Invalid biomeType');
            return false;
        }
        if (typeof json.biomeDepth !== 'string' ||
            !Object.values(LandAndBiome_1.BiomeDepth).includes(json.biomeDepth)) {
            console.log('Invalid biomeDepth');
            return false;
        }
        if (typeof json.cardText !== 'string') {
            console.log('Invalid cardText');
            return false;
        }
        if (typeof json.imageName !== 'string') {
            console.log('Invalid imageName');
            return false;
        }
        if (typeof json.attack !== 'number' || json.attack < 0) {
            console.log('Invalid attack');
            return false;
        }
        if (typeof json.health !== 'number' || json.health < 0) {
            console.log('Invalid health');
            return false;
        }
        if (typeof json.priority !== 'number' || json.priority < 0) {
            console.log('Invalid priority');
            return false;
        }
        if (!Array.isArray(json.costs) ||
            !json.costs.every(PayResourceCost_1.default.isLibraryJSONValid)) {
            console.log('Invalid costs');
            return false;
        }
        if (!Array.isArray(json.deckRequirements) ||
            !json.deckRequirements.every(function (req) {
                return DeckRequirement_1.default.isLibraryJSONValid(req);
            })) {
            console.log('Invalid deckRequirements');
            return false;
        }
        if (!Array.isArray(json.keywords) ||
            !json.keywords.every(function (lk) { return RuntimeKeyword_1.default.isLibraryJSONValid(lk); })) {
            console.log('Invalid libraryKeywords');
            return false;
        }
        if (!Array.isArray(json.abilities) ||
            !json.abilities.every(function (aa) { return RuntimeAbility_1.default.isLibraryJSONValid(aa); })) {
            console.log('Invalid abilities');
            return false;
        }
        // do this at some point but don't want to now
        // if (
        //   !Array.isArray(json.cardUpgrades) ||
        //   !json.cardUpgrades.every((cu) => CardUpgrade.isLibraryJSONValid(cu))
        // ) {
        //   console.log('Invalid cardUpgrades');
        //   return false;
        // }
        return true;
    };
    return LibraryCard;
}());
exports.default = LibraryCard;
