"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EffectUpgrade_1 = __importDefault(require("../Effect/EffectUpgrade"));
var Phase_1 = require("../../Enums/Phase");
var RuntimeAbility_1 = __importDefault(require("./RuntimeAbility"));
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var PayResourceCostUpgrade_1 = __importDefault(require("../PayResourceCost/PayResourceCostUpgrade"));
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var ActivatedAbilityUpgrade = /** @class */ (function () {
    function ActivatedAbilityUpgrade(abilityIndex, effectUpgrade, addUseablePhases, removeUseablePhases, costUpgrades, usesPerTurnChange, isActive) {
        this.abilityUpgradeIndex = abilityIndex;
        this.effectUpgrade = null;
        this.usesPerTurnChange = new ModifiableInt_1.default(usesPerTurnChange.baseValue, usesPerTurnChange.intModifiers);
        this.abilityUpgradeIndex = abilityIndex;
        this.isActive = isActive;
        this.addUseablePhases = __spreadArray([], addUseablePhases, true);
        this.removeUseablePhases = __spreadArray([], removeUseablePhases, true);
        this.costUpgrades = costUpgrades.map(function (upgrade) {
            return new PayResourceCostUpgrade_1.default(upgrade.statId, upgrade.valueChange);
        });
    }
    ActivatedAbilityUpgrade.prototype.upgradeAbility = function (ability) {
        this.effectUpgrade.upgradeEffect(ability.effect);
        for (var _i = 0, _a = this.addUseablePhases; _i < _a.length; _i++) {
            var phaseEnum = _a[_i];
            if (!ability.useableInPhases.includes(phaseEnum)) {
                ability.useableInPhases.push(phaseEnum);
            }
        }
        var _loop_1 = function (phaseEnum) {
            ability.useableInPhases = ability.useableInPhases.filter(function (c) { return c !== phaseEnum; });
        };
        for (var _b = 0, _c = this.removeUseablePhases; _b < _c.length; _b++) {
            var phaseEnum = _c[_b];
            _loop_1(phaseEnum);
        }
        if (!(ability instanceof RuntimeAbility_1.default))
            return;
        ability.usesPerTurn +=
            this.usesPerTurnChange.effectiveValue;
        var _loop_2 = function (costUpgrade) {
            var cost = ability.costs.find(function (c) { return c.statId === costUpgrade.statId; });
            if (cost) {
                cost.value += costUpgrade.valueChange.effectiveValue;
            }
            else {
                ability.costs.push(new PayResourceCost_1.default(costUpgrade.statId, costUpgrade.valueChange.effectiveValue));
            }
        };
        for (var _d = 0, _e = this.costUpgrades; _d < _e.length; _d++) {
            var costUpgrade = _e[_d];
            _loop_2(costUpgrade);
        }
        ability.isActive = this.isActive;
    };
    ActivatedAbilityUpgrade.prototype.toJSON = function () {
        return {
            abilityUpgradeIndex: this.abilityUpgradeIndex,
            effectUpgrade: this.effectUpgrade.toJSON(),
            addUseablePhases: this.addUseablePhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }),
            removeUseablePhases: this.removeUseablePhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }),
            costUpgrades: this.costUpgrades.map(function (c) { return c.toJSON(); }),
            usesPerTurnChange: this.usesPerTurnChange.toJSON(),
            isActive: this.isActive,
        };
    };
    ActivatedAbilityUpgrade.fromJSON = function (json) {
        return new ActivatedAbilityUpgrade(json.abilityUpgradeIndex, EffectUpgrade_1.default.fromJSON(json.effectUpgrade), json.addUseablePhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }), json.removeUseablePhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }), json.costUpgrades.map(function (c) { return PayResourceCostUpgrade_1.default.fromJSON(c); }), ModifiableInt_1.default.fromJSON(json.usesPerTurnChange), json.isActive);
    };
    return ActivatedAbilityUpgrade;
}());
exports.default = ActivatedAbilityUpgrade;
