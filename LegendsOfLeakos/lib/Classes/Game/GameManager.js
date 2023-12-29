"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryCard_1 = __importDefault(require("../Card/LibraryCard"));
var LibraryEnchantment_1 = __importDefault(require("../Enchantment/LibraryEnchantment"));
//
// In-game entry point to all data outside of game state.
var GameManager = /** @class */ (function () {
    // constructor
    function GameManager(cardLibrary, enchantmentLibrary) {
        // Properties now exist in their own static class - much easier to refernence that way
        // library objects
        this.cardLibrary = [];
        this.enchantmentLibrary = [];
        this.cardLibrary = cardLibrary;
        this.enchantmentLibrary = enchantmentLibrary;
    }
    // methods
    GameManager.prototype.getCardFromLibraryId = function (libraryId) {
        var card = this.cardLibrary.find(function (x) { return x.libraryId === libraryId; });
        if (card === undefined) {
            throw new Error("Could not find card with libraryId ".concat(libraryId));
        }
        return card;
    };
    GameManager.prototype.getEnchantmentFromLibraryId = function (libraryId) {
        var enchantment = this.enchantmentLibrary.find(function (x) { return x.libraryId === libraryId; });
        if (enchantment === undefined) {
            throw new Error("Could not find enchantment with libraryId ".concat(libraryId));
        }
        return enchantment;
    };
    GameManager.prototype.toJSON = function () {
        return {
            cardLibrary: this.cardLibrary.map(function (x) { return x.toJSON(); }),
            enchantmentLibrary: this.enchantmentLibrary.map(function (x) { return x.toJSON(); }),
        };
    };
    GameManager.fromJSON = function (json) {
        return new GameManager(json.cardLibrary.map(function (x) { return LibraryCard_1.default.fromJSON(x); }), json.enchantmentLibrary.map(function (x) { return LibraryEnchantment_1.default.fromJSON(x); }));
    };
    // utility methods
    GameManager.generateUniqueId = function (length) {
        if (length === void 0) { length = 20; }
        // need to make sure length is at least 20
        if (length < 20)
            length = 20;
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        var timePart = Date.now().toString(36);
        var randomPartLength = length - timePart.length;
        for (var i = 0; i < randomPartLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return timePart + result;
    };
    return GameManager;
}());
exports.default = GameManager;
