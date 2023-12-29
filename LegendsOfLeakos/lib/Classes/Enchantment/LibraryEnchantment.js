"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryKeyword_1 = __importDefault(require("../Keyword/LibraryKeyword/LibraryKeyword"));
var LibraryAbility_1 = __importDefault(require("../Ability/LibraryAbility"));
var LibraryEnchantment = /** @class */ (function () {
    function LibraryEnchantment() {
    }
    LibraryEnchantment.prototype.clone = function () {
        return LibraryEnchantment.fromJSON(this.toJSON());
    };
    LibraryEnchantment.prototype.toJSON = function () {
        return {
            libraryId: this.libraryId,
            name: this.name,
            description: this.description,
            keywords: this.keywords.map(function (x) { return x.toJSON(); }),
            abilities: this.abilities.map(function (x) { return x.toJSON(); }),
            imageName: this.imageName,
        };
    };
    LibraryEnchantment.fromJSON = function (json) {
        var newEnchantment = new LibraryEnchantment();
        newEnchantment.libraryId = json.libraryId;
        newEnchantment.name = json.name;
        newEnchantment.description = json.description;
        newEnchantment.keywords = json.keywords.map(function (x) {
            return LibraryKeyword_1.default.fromJSON(x);
        });
        newEnchantment.abilities = json.abilities.map(function (x) {
            return LibraryAbility_1.default.fromJSON(x);
        });
        newEnchantment.imageName = json.imageName;
        return newEnchantment;
    };
    LibraryEnchantment.isJSONValid = function (json) {
        if (json.libraryId === undefined) {
            return false;
        }
        if (json.name === undefined) {
            return false;
        }
        if (json.description === undefined) {
            return false;
        }
        if (json.keywords === undefined) {
            return false;
        }
        if (json.abilities === undefined) {
            return false;
        }
        if (json.imageName === undefined) {
            return false;
        }
        return true;
    };
    return LibraryEnchantment;
}());
exports.default = LibraryEnchantment;
