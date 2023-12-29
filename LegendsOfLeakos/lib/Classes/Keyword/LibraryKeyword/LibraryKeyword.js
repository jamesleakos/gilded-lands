"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryCondition_1 = __importDefault(require("../../Condition/LibraryCondition"));
var LibraryKeyword = /** @class */ (function () {
    function LibraryKeyword(keywordType, indexForUpgrades, designerDescription, isPermanent, duration, startsActive, conditions, imageName, data) {
        // conditions are for like - which cards will this buff, etc. I think it's largely for stat buffs
        this.conditions = [];
        this.keywordType = keywordType;
        this.indexForUpgrades = indexForUpgrades;
        this.designerDescription = designerDescription;
        this.isPermanent = isPermanent;
        this.duration = duration;
        this.startsActive = startsActive;
        this.conditions = conditions;
        this.imageName = imageName;
        this.data = data;
    }
    LibraryKeyword.prototype.toJSON = function () {
        return {
            keywordType: this.keywordType,
            indexForUpgrades: this.indexForUpgrades,
            designerDescription: this.designerDescription,
            isPermanent: this.isPermanent,
            duration: this.duration,
            startsActive: this.startsActive,
            conditions: this.conditions.map(function (c) { return c.toJSON(); }),
            imageName: this.imageName,
            data: this.data,
        };
    };
    LibraryKeyword.fromJSON = function (json) {
        return new LibraryKeyword(json.keywordType, json.indexForUpgrades, json.designerDescription, json.isPermanent, json.duration, json.startsActive, json.conditions.map(function (c) { return LibraryCondition_1.default.fromJSON(c); }), json.imageName, json.data);
    };
    return LibraryKeyword;
}());
exports.default = LibraryKeyword;
