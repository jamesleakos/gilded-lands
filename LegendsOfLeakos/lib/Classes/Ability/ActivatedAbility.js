"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var RuntimeEffect_1 = __importDefault(require("../Effect/RuntimeEffect"));
var Phase_1 = require("../../Enums/Phase");
var GameProperties_1 = __importDefault(require("../Game/GameProperties"));
// Import other required classes and types
var RuntimeAbility = /** @class */ (function () {
    function RuntimeAbility(indexForUpgrades, setName, setEffect, setCosts, setUsesPerTurn, setUsesRemaining, useableInPhases, isActive, image) {
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
    RuntimeAbility.prototype.isActivatable = function (owner, gameState) {
        if (this.usesRemaining <= 0) {
            return false;
        }
        if (!this.isActive) {
            return false;
        }
        if (!this.useableInPhases.includes(GameProperties_1.default.gamePhases[gameState.currentPhaseIndex].phaseEnum)) {
            return false;
        }
        if (!owner.canPayResourceCosts(this.costs)) {
            return false;
        }
        return true;
    };
    RuntimeAbility.prototype.onEndTurn = function () {
        this.usesRemaining = this.usesPerTurn;
        this.effect.onEndTurn();
    };
    // #region JSON
    RuntimeAbility.prototype.clone = function () {
        return new RuntimeAbility(this.indexForUpgrades, this.name, this.effect.clone(), this.costs.map(function (cost) { return cost.clone(); }), this.usesPerTurn, this.usesRemaining, this.useableInPhases, this.isActive, this.image);
    };
    RuntimeAbility.prototype.toJSON = function () {
        return {
            indexForUpgrades: this.indexForUpgrades,
            name: this.name,
            type: AbilityType[this.type],
            effect: this.effect.toJSON(),
            costs: this.costs.map(function (cost) { return cost.toJSON(); }),
            usesPerTurn: this.usesPerTurn,
            usesRemaining: this.usesRemaining,
            useableInPhases: this.useableInPhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }),
            isActive: this.isActive,
            image: this.image,
        };
    };
    RuntimeAbility.fromJSON = function (json) {
        return new RuntimeAbility(json.indexForUpgrades, json.name, RuntimeEffect_1.default.fromJSON(json.effect), json.costs.map(function (cost) { return PayResourceCost_1.default.fromJSON(cost); }), json.usesPerTurn, json.usesRemaining, json.useableInPhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }), json.isActive, json.image);
    };
    RuntimeAbility.isJSONValid = function (json) {
        if (typeof json.indexForUpgrades !== 'number') {
            console.log('Invalid JSON: indexForUpgrades is not a number');
            return false;
        }
        if (typeof json.name !== 'string') {
            console.log('Invalid JSON: name is not a string');
            return false;
        }
        if (!RuntimeEffect_1.default.isJSONValid(json.effect)) {
            console.log('Invalid JSON: effect is not valid');
            return false;
        }
        if (!Array.isArray(json.costs) ||
            !json.costs.every(function (c) { return PayResourceCost_1.default.isJSONValid(c); })) {
            console.log('Invalid JSON: costs is not an array');
            return false;
        }
        for (var _i = 0, _a = json.costs; _i < _a.length; _i++) {
            var cost = _a[_i];
            if (!PayResourceCost_1.default.isJSONValid(cost)) {
                console.log('Invalid JSON: cost is not valid');
                return false;
            }
        }
        if (typeof json.usesPerTurn !== 'number') {
            console.log('Invalid JSON: usesPerTurn is not a number');
            return false;
        }
        if (!Array.isArray(json.useableInPhases)) {
            console.log('Invalid JSON: useableInPhases is not an array');
            return false;
        }
        for (var _b = 0, _c = json.useableInPhases; _b < _c.length; _b++) {
            var phase = _c[_b];
            if (typeof phase !== 'string') {
                console.log('Invalid JSON: phase is not a string');
                return false;
            }
            if (!Object.values(Phase_1.PhaseEnum).includes(phase)) {
                console.log('Invalid JSON: phase is not a valid PhaseEnum');
                return false;
            }
        }
        return true;
    };
    return RuntimeAbility;
}());
exports.default = RuntimeAbility;
