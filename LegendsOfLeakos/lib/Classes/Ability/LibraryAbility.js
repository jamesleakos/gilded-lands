"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var LibraryEffect_1 = __importDefault(require("../Effect/LibraryEffect"));
var LibraryAbility = /** @class */ (function () {
    function LibraryAbility(indexForUpgrades, setName, setEffect, setCosts, setUsesPerTurn, setUsesRemaining, useableInPhases, isActive, image) {
        var _this = this;
        this.useableInPhases = [];
        this.costs = [];
        this.name = setName;
        this.indexForUpgrades = indexForUpgrades;
        this.effect = setEffect;
        this.isActive = isActive;
        setCosts.forEach(function (cost) {
            var temp = new PayResourceCost_1.default(cost.statId, cost.value);
            _this.costs.push(temp);
        });
        this.usesPerTurn = setUsesPerTurn;
        this.usesRemaining = setUsesRemaining;
        useableInPhases.forEach(function (phase) {
            _this.useableInPhases.push(phase);
        });
        this.image = image;
    }
    LibraryAbility.prototype.toJSON = function () {
        return {
            name: this.name,
            indexForUpgrades: this.indexForUpgrades,
            image: this.image,
            effect: this.effect.toJSON(),
            useableInPhases: this.useableInPhases,
            isActive: this.isActive,
            costs: this.costs.map(function (c) { return c.toJSON(); }),
            usesPerTurn: this.usesPerTurn,
            usesRemaining: this.usesRemaining,
        };
    };
    LibraryAbility.fromJSON = function (json) {
        var newAbility = new LibraryAbility(json.indexForUpgrades, json.name, LibraryEffect_1.default.fromJSON(json.effect), json.costs.map(function (c) { return PayResourceCost_1.default.fromJSON(c); }), json.usesPerTurn, json.usesRemaining, json.useableInPhases, json.isActive, json.image);
        return newAbility;
    };
    return LibraryAbility;
}());
exports.default = LibraryAbility;
